//
// commonmedia.js
// Summary: Common area for css files.
// Icon: commonmedia.jpg
//

$.commonmedia_config = {
    name: 'One-Click Apps',
    baseURL: null,
    version: '1457032716018',
    manifest: 'media/commonmedia.xml',
    updatefile: 'commonmedia1457032716018.cdpupdate',
    username: 'mom',
    password: 'lkjsdfsod',
    remoteStart: 'node/2',
    localStart: '',
    localBaseURL: '%ALLUSERSPROFILE%\\cdp\\common\\media\\',
    alerts: null,
    updatelog: 'common.update.xml',
    branch: '2.0',
    LURL: '%ALLUSERSPROFILE%\\cdp\\snapback\\apps\\common\\media\\commonmedia.xml',
    RURL: 'http://snapback-apps.com/commonmedia/commonmedia.xml',
    status: 'development-snapshot'
}
;

$.commonmedia_config.baseURL = $.commonmedia_config.RURL;
$.commonmedia_config.baseURL = "http://" + $.commonmedia_config.baseURL.substring($.commonmedia_config.baseURL.indexOf('@') + 1, $.commonmedia_config.baseURL.lastIndexOf('/'));
$.commonmedia_config.baseURL = $.commonmedia_config.baseURL.substring(0, $.commonmedia_config.baseURL.lastIndexOf('/') - 9);
$.commonmedia_config.alerts = $.commonmedia_config.baseURL + 'feed.xml';
