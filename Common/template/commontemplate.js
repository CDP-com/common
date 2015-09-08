//
// commontemplate.js
// Summary: Common area for css files.
// Icon: commontemplate.jpg
//

$.commontemplate_config = {
    name: 'SnapBack Apps',
    baseURL: null,
    version: '1441381914722',
    manifest: 'template/commontemplate.xml',
    updatefile: 'commontemplate1441381914722.cdpupdate',
    username: 'mom',
    password: 'lkjsdfsod',
    remoteStart: 'node/2',
    localStart: '',
    localBaseURL: '%ALLUSERSPROFILE%\\cdp\\common\\Template\\',
    alerts: null,
    updatelog: 'common.update.xml',
    branch: '2.0',
    LURL: '%ALLUSERSPROFILE%\\cdp\\snapback\\apps\\common\\Template\\commontemplate.xml',
    RURL: 'http://snapback-apps.com/commontemplate/commontemplate.xml',
    status: 'development-snapshot'
}
;

$.commontemplate_config.baseURL = $.commontemplate_config.RURL;
$.commontemplate_config.baseURL = "http://" + $.commontemplate_config.baseURL.substring($.commontemplate_config.baseURL.indexOf('@') + 1, $.commontemplate_config.baseURL.lastIndexOf('/'));
$.commontemplate_config.baseURL = $.commontemplate_config.baseURL.substring(0, $.commontemplate_config.baseURL.lastIndexOf('/') - 9);
$.commontemplate_config.alerts = $.commontemplate_config.baseURL + 'feed.xml';
