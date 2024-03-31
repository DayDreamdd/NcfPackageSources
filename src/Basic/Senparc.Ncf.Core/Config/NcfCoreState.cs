﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Senparc.Ncf.Core.Config
{
    /// <summary>
    /// NCF 系统状态
    /// </summary>
    public record class NcfCoreState
    {
        #region 单例

        NcfCoreState() { }

        /// <summary>
        /// DatabaseConfigurationFactory 的全局单例
        /// </summary>
        public static NcfCoreState Instance
        {
            get
            {
                return Nested.instance;
            }
        }

        class Nested
        {
            static Nested() { }

            internal static readonly NcfCoreState instance = new NcfCoreState();
        }

        #endregion

        /// <summary>
        /// 已经完成所有 AddXncfModule 的应用
        /// </summary>
        public bool AllAddXncfModuleApplied { get; set; }
        /// <summary>
        /// 已经完成所有 UseXncfModuleApplied 的应用
        /// </summary>
        public bool AllUseXncfModuleApplied { get; set; }
        /// <summary>
        /// 已经完成所有 AuthorizeConfig 的应用，即所有 Area 的权限配置已经完成，以及所有 IAreaRegister 接口已经执行完成
        /// </summary>
        public bool AllAuthorizeConfigApplied { get; set; }

        /// <summary>
        /// 任意一个 XNCF 模块的数据库注册已经载入
        /// </summary>
        public bool AynDatabaseXncfLoaded { get; set; }
        /// <summary>
        /// 所有 XNCF 模块的数据库注册已经载入
        /// </summary>
        public bool AllDatabaseXncfLoaded { get; set; }

        /// <summary>
        /// 任意一个 XNCF 模块的线程注册已经载入
        /// </summary>
        public bool AnyThreadXncfLoaded { get; set; }
        /// <summary>
        /// 所有 XNCF 模块的线程注册已经载入
        /// </summary>
        public bool AllThreadXncfLoaded { get; set; }

        /// <summary>
        ///  XNCF 模块的 AddXncfDatabaseModule 方法已经载入（任意一个）
        /// </summary>
        public bool AnyAddXncfDatabaseModuleApplied { get; set; }
    }
}
