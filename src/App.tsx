import { IonApp, setupIonicReact } from '@ionic/react';
import MyMap from './components/MyMap';


import '@ionic/react/css/core.css';


import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';


import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';



setupIonicReact();

const App = () => (
  <IonApp>
    <MyMap/>
  </IonApp>
);

export default App;
