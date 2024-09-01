import { makeInstaller} from "@toy-elements/utils";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import '@toy-elements/theme/index.css'

const installer = makeInstaller(components);

library.add(fas);

export * from '../components';
export default installer;