Type.registerNamespace('SnT.tportalCms.Modules');
SnT.tportalCms.Modules.SurveyService=function() {
SnT.tportalCms.Modules.SurveyService.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
SnT.tportalCms.Modules.SurveyService.prototype={
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return SnT.tportalCms.Modules.SurveyService._staticInstance.get_path();},
Load:function(surveyId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'Load',false,{surveyId:surveyId},succeededCallback,failedCallback,userContext); },
Save:function(surveyId,answerId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'Save',false,{surveyId:surveyId,answerId:answerId},succeededCallback,failedCallback,userContext); }}
SnT.tportalCms.Modules.SurveyService.registerClass('SnT.tportalCms.Modules.SurveyService',Sys.Net.WebServiceProxy);
SnT.tportalCms.Modules.SurveyService._staticInstance = new SnT.tportalCms.Modules.SurveyService();
SnT.tportalCms.Modules.SurveyService.set_path = function(value) { SnT.tportalCms.Modules.SurveyService._staticInstance.set_path(value); }
SnT.tportalCms.Modules.SurveyService.get_path = function() { return SnT.tportalCms.Modules.SurveyService._staticInstance.get_path(); }
SnT.tportalCms.Modules.SurveyService.set_timeout = function(value) { SnT.tportalCms.Modules.SurveyService._staticInstance.set_timeout(value); }
SnT.tportalCms.Modules.SurveyService.get_timeout = function() { return SnT.tportalCms.Modules.SurveyService._staticInstance.get_timeout(); }
SnT.tportalCms.Modules.SurveyService.set_defaultUserContext = function(value) { SnT.tportalCms.Modules.SurveyService._staticInstance.set_defaultUserContext(value); }
SnT.tportalCms.Modules.SurveyService.get_defaultUserContext = function() { return SnT.tportalCms.Modules.SurveyService._staticInstance.get_defaultUserContext(); }
SnT.tportalCms.Modules.SurveyService.set_defaultSucceededCallback = function(value) { SnT.tportalCms.Modules.SurveyService._staticInstance.set_defaultSucceededCallback(value); }
SnT.tportalCms.Modules.SurveyService.get_defaultSucceededCallback = function() { return SnT.tportalCms.Modules.SurveyService._staticInstance.get_defaultSucceededCallback(); }
SnT.tportalCms.Modules.SurveyService.set_defaultFailedCallback = function(value) { SnT.tportalCms.Modules.SurveyService._staticInstance.set_defaultFailedCallback(value); }
SnT.tportalCms.Modules.SurveyService.get_defaultFailedCallback = function() { return SnT.tportalCms.Modules.SurveyService._staticInstance.get_defaultFailedCallback(); }
SnT.tportalCms.Modules.SurveyService.set_path("/App_Modules__SnT.tportalCms.Modules__SnT.tportalCms.Modules.Survey.SurveyService.asmx");
SnT.tportalCms.Modules.SurveyService.Load= function(surveyId,onSuccess,onFailed,userContext) {SnT.tportalCms.Modules.SurveyService._staticInstance.Load(surveyId,onSuccess,onFailed,userContext); }
SnT.tportalCms.Modules.SurveyService.Save= function(surveyId,answerId,onSuccess,onFailed,userContext) {SnT.tportalCms.Modules.SurveyService._staticInstance.Save(surveyId,answerId,onSuccess,onFailed,userContext); }
