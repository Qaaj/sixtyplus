
import UserStore from '../stores/UserStore';

let locale = "EN";
let DEBUG = false;

let current = {
  "quickstart":"Quickstart",
  "portfolio": "Portfolio",
  "import": "Import",
  "portfolio_graph_help": "html:<p><b>Click</b> on a label to toggle active state.</p><p><b>Alt + Click</b> on a label to disable other tickers.</p>",
  "portfolio_graph": "Portfolio Graph",
  "settings": "Settings",
  "news": "News"
};

function TranslationText(props) {

  let cx = '';
  if (props.debug) cx = 'translation_debug'
  return (
    <span className={cx}>
      {props.text}
    </span>
  );
}

function HTMLTranslation(props) {

  let content = props.html.replace("html:",'');
  content = content.trim();
  const html = {__html: content};

  return <span dangerouslySetInnerHTML={html}></span>;
}

export function setLanguageMap(lang) {
  if (lang) {
    if (lang.toUpperCase() === 'EN') current = EN_translations;
    if (lang.toUpperCase() === 'DE') current = DE_translations;
    locale = lang;
  }
}

// Fix this for HTML translations
export function getTranslation(key, isText = false, templates) {

  let isHTML = false;

  // When NOT on stage, always return plain strings
  if (window.env !== 'stage') isText = true;
  let debugMode = DEBUG;

  //If there's no params, return the current language
  if (!key) return locale.toUpperCase();

  // Get the translation
  let translation = current[key];

  // Enable debug parameter
  if (window.location.hash.indexOf('debug_translations') !== -1) debugMode = true;

  //If debug mode, return the key
  if (debugMode) translation = '[' + key + ']';

  // If not found, use the key
  if (!translation) {
    translation = '[' + key + ']';
    debugMode = true;
  }

  // Do the templating
  if (templates) {

    translation = Object.keys(templates).reduce((final, templateKey) => {
      return final.replace(templateKey, templates[templateKey]);
    }, translation);

  }

  if (translation.indexOf('html') !== -1) {
    isText = false;
    isHTML = true;
  }

  if (isHTML) return <HTMLTranslation html={translation}/>;

  // If requested, only return the string. OR
  // If we found the key, also just return the string
  if (isText || current[key]) return translation;


  return <TranslationText text={translation} debug={debugMode}/>;
}
