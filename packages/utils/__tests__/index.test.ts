// 测试有效性
import { describe, expect, it } from "vitest";
// 即将要测试方法
import { debugWarn, throwError, withInstall, typeIconMap, makeInstaller } from '../'
import { each } from "lodash-es";

describe('utils/index', () => {
    it('debugWarn should be exported', () => {
        expect(debugWarn).toBeDefined(); //是否被定义了 不是undefined
    })
    // 之后
    it('thorwError should be exported', () => {
        expect(throwError).toBeDefined();//是否被定义了 不是undefined
    })
    it('withInstall should be exported', () => {
        expect(withInstall).toBeDefined();//是否被定义了 不是undefined
    })
    it('makeInstaller should be exported', () => {
        expect(makeInstaller).toBeDefined();//是否被定义了 不是undefined
    })
    it('typeIconMap should be worked', () => {
        expect(typeIconMap).toBeDefined();//是否被定义了 不是undefined
        each([["info", "circle-info"],
        ["success", "check-circle"],
        ["warning", "circle-exclamation"],
        ["danger", "circle-xmark"],
        ["error", "circle-xmark"],], ([type, icon]) => {
            expect(typeIconMap.get(type)).toBe(icon);// 是否相等
        })
    })
})