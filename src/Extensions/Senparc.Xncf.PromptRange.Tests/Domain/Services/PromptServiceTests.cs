﻿using Microsoft.Extensions.DependencyInjection;
using Senparc.Xncf.PromptRange.Tests;

namespace Senparc.Xncf.PromptRange.Domain.Services.Tests
{
    [TestClass()]
    public class PromptServiceTests : PromptTestBase
    {
        protected PromptService _service;

        public PromptServiceTests()
        {
            _service = base._serviceProvder.GetRequiredService<PromptService>();
        }

        #region XncfBuilderPrompt 测试

        /// <summary>
        /// 测试实体类生成：PromptGroup
        /// </summary>
        /// <returns></returns>
        [TestMethod()]
        public async Task GenerateEntityClass_PromptGroupTest()
        {
            Assert.IsNotNull(this._service);
            var dt1 = SystemTime.Now;

            //PromptItem
            var prompt = "这个领域用于控制所有的 Prompt 核心业务逻辑，包括使用 Prompt 操作大预言模型所需的所有必要的参数，类名叫：PromptGroup，用于管理一组相关联的 Prompt，并统一配置其参数。其中必须要包含 LLM 被调用时的所需的所有参数，包括但不仅限于： MaxToken、Temperature、TopP、FrequencyPenalty、ResultsPerPrompt、StopSequences、ChatSystemPrompt、TokenSelectionBiases，等等，除此以外，还需要包含用于评估 Prompt 效果所需要的必要参数，以及 Name 等属于“Group”类型的实体类应该有的参数。";
            var result = await this._service.GetPromptResultAsync(XncfBuilderPromptType.EntityClass, prompt);

            Assert.IsNotNull(result);
            await Console.Out.WriteLineAsync(result);
            await Console.Out.WriteLineAsync();
            await Console.Out.WriteLineAsync($"耗时：{SystemTime.NowDiff(dt1).TotalSeconds} 秒");
        }


        /// <summary>
        /// 测试实体类生成：PromptItem
        /// </summary>
        /// <returns></returns>
        [TestMethod()]
        public async Task GenerateEntityClass_PromptItemTest()
        {
            Assert.IsNotNull(this._service);
            var dt1 = SystemTime.Now;

            //PromptItem
            var prompt = "这个领域用于控制所有的 Prompt 核心业务逻辑，包括使用 Prompt 操作大预言模型所需的所有必要的参数，类名叫：PromptItem，其中必须要包含 LLM 被调用时的所需的所有参数，包括但不仅限于： MaxToken、Temperature、TopP、FrequencyPenalty、ResultsPerPrompt、StopSequences、ChatSystemPrompt、TokenSelectionBiases，等等，除此以外，还需要包含用于评估 Prompt 效果所需要的必要参数。";
            var result = await this._service.GetPromptResultAsync(XncfBuilderPromptType.EntityClass, prompt);

            Assert.IsNotNull(result);
            await Console.Out.WriteLineAsync(result);
            await Console.Out.WriteLineAsync();
            await Console.Out.WriteLineAsync($"耗时：{SystemTime.NowDiff(dt1).TotalSeconds} 秒");
        }

        #endregion

    }
}