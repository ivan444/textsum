Type.registerNamespace('SnT.Cms2.Modules');
SnT.Cms2.Modules.GalleryService=function() {
SnT.Cms2.Modules.GalleryService.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
SnT.Cms2.Modules.GalleryService.prototype={
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return SnT.Cms2.Modules.GalleryService._staticInstance.get_path();},
GetList:function(galleryId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetList',false,{galleryId:galleryId},succeededCallback,failedCallback,userContext); },
GetListByKeywords:function(keywords,rowCount,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetListByKeywords',false,{keywords:keywords,rowCount:rowCount},succeededCallback,failedCallback,userContext); },
VoteForImage:function(imageId,grade,fileIndex,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'VoteForImage',false,{imageId:imageId,grade:grade,fileIndex:fileIndex},succeededCallback,failedCallback,userContext); }}
SnT.Cms2.Modules.GalleryService.registerClass('SnT.Cms2.Modules.GalleryService',Sys.Net.WebServiceProxy);
SnT.Cms2.Modules.GalleryService._staticInstance = new SnT.Cms2.Modules.GalleryService();
SnT.Cms2.Modules.GalleryService.set_path = function(value) { SnT.Cms2.Modules.GalleryService._staticInstance.set_path(value); }
SnT.Cms2.Modules.GalleryService.get_path = function() { return SnT.Cms2.Modules.GalleryService._staticInstance.get_path(); }
SnT.Cms2.Modules.GalleryService.set_timeout = function(value) { SnT.Cms2.Modules.GalleryService._staticInstance.set_timeout(value); }
SnT.Cms2.Modules.GalleryService.get_timeout = function() { return SnT.Cms2.Modules.GalleryService._staticInstance.get_timeout(); }
SnT.Cms2.Modules.GalleryService.set_defaultUserContext = function(value) { SnT.Cms2.Modules.GalleryService._staticInstance.set_defaultUserContext(value); }
SnT.Cms2.Modules.GalleryService.get_defaultUserContext = function() { return SnT.Cms2.Modules.GalleryService._staticInstance.get_defaultUserContext(); }
SnT.Cms2.Modules.GalleryService.set_defaultSucceededCallback = function(value) { SnT.Cms2.Modules.GalleryService._staticInstance.set_defaultSucceededCallback(value); }
SnT.Cms2.Modules.GalleryService.get_defaultSucceededCallback = function() { return SnT.Cms2.Modules.GalleryService._staticInstance.get_defaultSucceededCallback(); }
SnT.Cms2.Modules.GalleryService.set_defaultFailedCallback = function(value) { SnT.Cms2.Modules.GalleryService._staticInstance.set_defaultFailedCallback(value); }
SnT.Cms2.Modules.GalleryService.get_defaultFailedCallback = function() { return SnT.Cms2.Modules.GalleryService._staticInstance.get_defaultFailedCallback(); }
SnT.Cms2.Modules.GalleryService.set_path("/App_Modules__SnT.Cms2.Modules__SnT.Cms2.Modules.Gallery.GalleryService.asmx");
SnT.Cms2.Modules.GalleryService.GetList= function(galleryId,onSuccess,onFailed,userContext) {SnT.Cms2.Modules.GalleryService._staticInstance.GetList(galleryId,onSuccess,onFailed,userContext); }
SnT.Cms2.Modules.GalleryService.GetListByKeywords= function(keywords,rowCount,onSuccess,onFailed,userContext) {SnT.Cms2.Modules.GalleryService._staticInstance.GetListByKeywords(keywords,rowCount,onSuccess,onFailed,userContext); }
SnT.Cms2.Modules.GalleryService.VoteForImage= function(imageId,grade,fileIndex,onSuccess,onFailed,userContext) {SnT.Cms2.Modules.GalleryService._staticInstance.VoteForImage(imageId,grade,fileIndex,onSuccess,onFailed,userContext); }
var gtc = Sys.Net.WebServiceProxy._generateTypedConstructor;
if (typeof(SnT.Cms2.Modules.GalleryResponse) === 'undefined') {
SnT.Cms2.Modules.GalleryResponse=gtc("SnT.Cms2.Modules.GalleryResponse");
SnT.Cms2.Modules.GalleryResponse.registerClass('SnT.Cms2.Modules.GalleryResponse');
}
if (typeof(SnT.Cms2.Modules.GalleryFileVoteResponse) === 'undefined') {
SnT.Cms2.Modules.GalleryFileVoteResponse=gtc("SnT.Cms2.Modules.GalleryFileVoteResponse");
SnT.Cms2.Modules.GalleryFileVoteResponse.registerClass('SnT.Cms2.Modules.GalleryFileVoteResponse');
}
