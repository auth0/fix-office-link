var USER_AGENTS_REGEX = /[^\w](Word|Excel|PowerPoint|ms-office)([^\w]|\z)/;
var EXCLUDE_USER_AGENTS_REGEX = /Microsoft Outlook/;
var auto_refresh = "<html><head><meta http-equiv='refresh' content='0'/></head><body></body></html>";

module.exports = function (req, res, next) {
  if (USER_AGENTS_REGEX.exec(req.headers['user-agent']) &&
      !EXCLUDE_USER_AGENTS_REGEX.exec(req.headers['user-agent'])) {

    res.set('Content-Type', 'text/html');

    return res.send(auto_refresh);
  }

  return next();
};