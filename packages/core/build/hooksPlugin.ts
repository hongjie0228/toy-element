import { each,isFunction } from "lodash-es";
import shell from 'shelljs';


interface Plugin {
    rmFiles?: string[];
    beforeBuild?:Function;
    afterBuild?:Function
}

export default function hooksPlugin({rmFiles,beforeBuild,afterBuild}:Plugin){
    return {
        name: 'hooks-plugin',
        buildStart:()=>{
            // 删除操作
            each(rmFiles,(fName)=> shell.rm('-rf',fName));
            isFunction(beforeBuild) && beforeBuild();
        },
        buildEnd:(err?:Error)=>{
            !err && isFunction(afterBuild) && afterBuild();
        }
    }
}