export default function printLogo() {
    if (PROD) {
      const logo = `
  _____________________________________________________________________________________________
  
    ___________                    ___________.__                                __          
    \__    ___/___ ___.__.         \_   _____/|  |   ____   _____   ____   _____/  |_  ______
    |    | /  _ <   |  |  ______  |    __)_ |  | _/ __ \ /     \_/ __ \ /    \   __\/  ___/
    |    |(  <_> )___  | /_____/  |        \|  |_\  ___/|  Y Y  \  ___/|   |  \  |  \___ \ 
    |____| \____// ____|         /_______  /|____/\___  >__|_|  /\___  >___|  /__| /____  >
                \/                      \/           \/      \/     \/     \/          \/ 
                                                
  _____________________________________________________________________________________________
                                 author:lihongjie 
  `;
  
      const rainbowGradient = `
  background: linear-gradient(135deg, orange 60%, cyan);
  background-clip: text;
  color: transparent;
  font-size: 16px; 
  line-height: 1;
  font-family: monospace;
  font-weight: 600;
  `;
  
      console.info(`%c${logo}`, rainbowGradient);
    } else if (DEV) {
      console.log("..........................................");
    }
  }
  