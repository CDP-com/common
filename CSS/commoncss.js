//
// commoncss.js
// Summary: Common area for css files.
// Icon: commoncss.jpg
//

$.commoncss_config = {
    name: 'One-Click Apps',
    baseURL: null,
    version: '1457032727153',
    manifest: 'css/commoncss.xml',
    updatefile: 'commoncss1457032727153.cdpupdate',
    username: 'mom',
    password: 'lkjsdfsod',
    remoteStart: 'node/2',
    localStart: '',
    localBaseURL: '%ALLUSERSPROFILE%\\cdp\\common\\css\\',
    alerts: null,
    updatelog: 'common.update.xml',
    branch: '2.0',
    LURL: '%ALLUSERSPROFILE%\\cdp\\snapback\\apps\\common\\css\\commoncss.xml',
    RURL: 'http://snapback-apps.com/commoncss/commoncss.xml',
    status: 'development-snapshot'
}
;

$.commoncss_config.baseURL = $.commoncss_config.RURL;
$.commoncss_config.baseURL = "http://" + $.commoncss_config.baseURL.substring($.commoncss_config.baseURL.indexOf('@') + 1, $.commoncss_config.baseURL.lastIndexOf('/'));
$.commoncss_config.baseURL = $.commoncss_config.baseURL.substring(0, $.commoncss_config.baseURL.lastIndexOf('/') - 9);
$.commoncss_config.alerts = $.commoncss_config.baseURL + 'feed.xml';
