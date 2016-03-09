//
// commonscripts.js
// Summary: Common area for css files.
// Icon: commonscripts.jpg
//

$.commonscripts_config = {
    name: 'One-Click Apps',
    baseURL: null,
    version: '1457032722649',
    manifest: 'scripts/commonscripts.xml',
    updatefile: 'commonscripts1457032722649.cdpupdate',
    username: 'mom',
    password: 'lkjsdfsod',
    remoteStart: 'node/2',
    localStart: '',
    localBaseURL: '%ALLUSERSPROFILE%\\cdp\\common\\scripts\\',
    alerts: null,
    updatelog: 'common.update.xml',
    branch: '2.0',
    LURL: '%ALLUSERSPROFILE%\\cdp\\snapback\\apps\\common\\scripts\\commonscripts.xml',
    RURL: 'http://snapback-apps.com/commonscripts/commonscripts.xml',
    status: 'development-snapshot'
}
;

$.commonscripts_config.baseURL = $.commonscripts_config.RURL;
$.commonscripts_config.baseURL = "http://" + $.commonscripts_config.baseURL.substring($.commonscripts_config.baseURL.indexOf('@') + 1, $.commonscripts_config.baseURL.lastIndexOf('/'));
$.commonscripts_config.baseURL = $.commonscripts_config.baseURL.substring(0, $.commonscripts_config.baseURL.lastIndexOf('/') - 9);
$.commonscripts_config.alerts = $.commonscripts_config.baseURL + 'feed.xml';
