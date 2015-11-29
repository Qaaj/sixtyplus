
import UserStore from '../stores/UserStore';

let language = "EN";
let DEBUG = false;

let temp = {
  'test':'test string',
  'ok': 'everything ok'
}

function TranslationText(props) {
  let cx = '';
  if(props.debug) cx = 'translation_debug'
  return (
    <span className={cx}>
      {props.text}
    </span>
  );
}

export function setLang(obj){
  temp = obj;
}

export function getTranslation(key, isText = false){

  let debugMode = DEBUG;

  //If there's no params, return the current language
  if(!key) return this.language;

  // Get the translation
  let translation = temp[key];

  //If debug mode, return the key
  if(DEBUG) translation = key;

  // If not found, use the key
  if(!translation){
    translation = '[' + key + ']';
    debugMode = true;
  }

  // If requested, only return the string
  if(isText) return translation;

  return <TranslationText text={translation} debug={debugMode} />;

}
