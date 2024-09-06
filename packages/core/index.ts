import { makeInstaller} from "@toy-elements/utils";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import printLogo from "./printLogo";
import '@toy-elements/theme/index.css'
printLogo()

const installer = makeInstaller(components);

library.add(fas);

export * from '@toy-elements/components';
export default installer;