Type.registerNamespace('SnT.tportalCms.Modules');
SnT.tportalCms.Modules.CommentsService=function() {
SnT.tportalCms.Modules.CommentsService.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
SnT.tportalCms.Modules.CommentsService.prototype={
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return SnT.tportalCms.Modules.CommentsService._staticInstance.get_path();},
GetList:function(objectId,rowCount,pageIndex,pageSize,userProfileId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetList',false,{objectId:objectId,rowCount:rowCount,pageIndex:pageIndex,pageSize:pageSize,userProfileId:userProfileId},succeededCallback,failedCallback,userContext); },
AddNew:function(objectId,nickName,body,userToken,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'AddNew',false,{objectId:objectId,nickName:nickName,body:body,userToken:userToken},succeededCallback,failedCallback,userContext); }}
SnT.tportalCms.Modules.CommentsService.registerClass('SnT.tportalCms.Modules.CommentsService',Sys.Net.WebServiceProxy);
SnT.tportalCms.Modules.CommentsService._staticInstance = new SnT.tportalCms.Modules.CommentsService();
SnT.tportalCms.Modules.CommentsService.set_path = function(value) { SnT.tportalCms.Modules.CommentsService._staticInstance.set_path(value); }
SnT.tportalCms.Modules.CommentsService.get_path = function() { return SnT.tportalCms.Modules.CommentsService._staticInstance.get_path(); }
SnT.tportalCms.Modules.CommentsService.set_timeout = function(value) { SnT.tportalCms.Modules.CommentsService._staticInstance.set_timeout(value); }
SnT.tportalCms.Modules.CommentsService.get_timeout = function() { return SnT.tportalCms.Modules.CommentsService._staticInstance.get_timeout(); }
SnT.tportalCms.Modules.CommentsService.set_defaultUserContext = function(value) { SnT.tportalCms.Modules.CommentsService._staticInstance.set_defaultUserContext(value); }
SnT.tportalCms.Modules.CommentsService.get_defaultUserContext = function() { return SnT.tportalCms.Modules.CommentsService._staticInstance.get_defaultUserContext(); }
SnT.tportalCms.Modules.CommentsService.set_defaultSucceededCallback = function(value) { SnT.tportalCms.Modules.CommentsService._staticInstance.set_defaultSucceededCallback(value); }
SnT.tportalCms.Modules.CommentsService.get_defaultSucceededCallback = function() { return SnT.tportalCms.Modules.CommentsService._staticInstance.get_defaultSucceededCallback(); }
SnT.tportalCms.Modules.CommentsService.set_defaultFailedCallback = function(value) { SnT.tportalCms.Modules.CommentsService._staticInstance.set_defaultFailedCallback(value); }
SnT.tportalCms.Modules.CommentsService.get_defaultFailedCallback = function() { return SnT.tportalCms.Modules.CommentsService._staticInstance.get_defaultFailedCallback(); }
SnT.tportalCms.Modules.CommentsService.set_path("/App_Modules__SnT.tportalCms.Modules__SnT.tportalCms.Modules.Comments.CommentsService.asmx");
SnT.tportalCms.Modules.CommentsService.GetList= function(objectId,rowCount,pageIndex,pageSize,userProfileId,onSuccess,onFailed,userContext) {SnT.tportalCms.Modules.CommentsService._staticInstance.GetList(objectId,rowCount,pageIndex,pageSize,userProfileId,onSuccess,onFailed,userContext); }
SnT.tportalCms.Modules.CommentsService.AddNew= function(objectId,nickName,body,userToken,onSuccess,onFailed,userContext) {SnT.tportalCms.Modules.CommentsService._staticInstance.AddNew(objectId,nickName,body,userToken,onSuccess,onFailed,userContext); }
var gtc = Sys.Net.WebServiceProxy._generateTypedConstructor;
if (typeof(SnT.tportalCms.Modules.CommentResponse) === 'undefined') {
SnT.tportalCms.Modules.CommentResponse=gtc("SnT.tportalCms.Modules.CommentResponse");
SnT.tportalCms.Modules.CommentResponse.registerClass('SnT.tportalCms.Modules.CommentResponse');
}
