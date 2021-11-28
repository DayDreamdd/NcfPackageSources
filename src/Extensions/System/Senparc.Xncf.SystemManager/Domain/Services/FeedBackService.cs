using System;
using Senparc.Ncf.Log;
using Senparc.Ncf.Core.Models.DataBaseModel;
using Senparc.Ncf.Service;
using Senparc.Ncf.Repository;

namespace Senparc.Xncf.SystemManager.Domain
{
    public class FeedBackService : ClientServiceBase<FeedBack>
    {
        public FeedBackService(IClientRepositoryBase<FeedBack> repo, IServiceProvider serviceProvider) : base(repo, serviceProvider)
        {
        }

        public FeedBack CreateOrUpdate( string content, int userId, string id = "")
        {
            var obj = GetObject(z => z.Id == id) ?? new FeedBack()
            {
                AccountId = userId,
                Content = content,
                AddTime = DateTime.Now
            };
            SaveObject(obj);
            return obj;
        }

        public override void SaveObject(FeedBack obj)
        {
            var isInsert = base.IsInsert(obj);
            base.SaveObject(obj);
            LogUtility.WebLogger.InfoFormat("{1}数据（ID：{0}）", obj.Id, isInsert ? "新增" : "编辑");
        }

        public override void DeleteObject(FeedBack obj)
        {
            obj.Flag = true;
            base.SaveObject(obj);
            LogUtility.WebLogger.Info($"删除数据：（ID：{obj.Id}）");
        }
    }
}