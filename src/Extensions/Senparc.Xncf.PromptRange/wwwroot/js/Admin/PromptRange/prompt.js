var app = new Vue({
    el: "#app",
    data() {
        return {
            // ���� ���� ---start
            promptid: '',// ѡ��г�
            modelid: '',// ѡ��ģ��
            content: '',// prompt ��������
            remarks: '', // prompt ����ı�ע
            // �������� ��ͼ�����б�
            parameterViewList: [
                {
                    tips: '',
                    formField: 'topP',
                    label: 'Top_p',
                    value: '',
                    isSlider: true,
                    sliderMin: 0,
                    sliderMax: 1,
                    sliderStep:0.1
                },
                {
                    tips: '',
                    formField: 'temperature',
                    label: 'Temperature',
                    value: '',
                    isSlider: true,
                    sliderMin: 0,
                    sliderMax: 1,
                    sliderStep: 0.1
                },
                {
                    tips: '',
                    formField: 'maxToken',
                    label: 'MaxToken',
                    value: '',
                    isSlider: false,
                    sliderMin: 0,
                    sliderMax: 'Infinity',
                    sliderStep: 1
                },
                {
                    tips: '',
                    formField: 'frequencyPenalty',
                    label: 'Frequeny_penalty',
                    value: '',
                    isSlider: true,
                    sliderMin: -2,
                    sliderMax: 2,
                    sliderStep: 0.1
                },
                {
                    tips: '',
                    formField:'presencePenalty',
                    label: 'Presence_penalty',
                    value: '',
                    isSlider: true,
                    sliderMin: 0,
                    sliderMax: 1,
                    sliderStep: 0.1
                }
            ],
            // ���� ���� ---end
            // ��� ---start
            outputActive: '', // ����б�ѡ�в鿴|����
            outputList: [
                {
                    id:1,
                    time: '2023-10-25 19:55:55',
                    costTime: '4s',
                    version: '1-4',
                    answer: '����������������������������������������������������������������������������������������������������������������������������������������',
                    scoreType: '1', // 1 ai��2�ֶ� 
                    isScore: false, // �Ƿ��Ѿ�����
                    isScoreView:false, // �Ƿ���ʾ������ͼ
                    scoreVal: '',
                    alResultList: [
                        {
                            id: 1,
                            label: 'Expected Answer 1',
                            value: ''
                        }, {
                            id: 2,
                            label: 'Expected Answer 2',
                            value: ''
                        }, {
                            id: 3,
                            label: 'Expected Answer 3',
                            value: ''
                        }
                    ],

                }
            ],
            // ��� ---end
            tabsActive: '1',
            // prompt ���
            modelSelectVal: '',
            parameter: {
                promptGroupId: 0,
                topP: 0,
                temperature: 0,
                maxToken: 0,
                frequencyPenalty: 0,
                presencePenalty: 0,
                modelid: '',
                content: ''
            },
            inputPromptVal: '',
            outPutVal: '',
            recordInfoTabsActive: '1',
            modelOpt: [],
            versionData: [],
            historyData: [],
            // �������
            scoringType: '', // 1 2
            alScoreList: [],
            manualScorVal: '',
            promptSelectVal: '',
            promptDetail: {},
            promptSelectValObj: {
                ask: '123',
                answer: '123'
            },
            manageQueryList: {
                page: 1,
                size: 10,
                modelName: ''
            },
            pageSizes: [10, 20, 30, 50],
            manageTableTotal: 0,
            manageTableData: [],
            promptOpt: [],
            multipleSelection: {}
        };
    },
    watch: {
        //'isExtend': {
        //    handler: function (val, oldVal) {
        //    },
        //    immediate: true,
        //    //deep:true
        //}
    },
    created: function () {
        this.getModelOptData()
        this.getScoringTrendData()
        //this.getHistoryData()
        //this.getVersionData()
    },
    methods: {
        // ��ȡģ���б�
        async getModelOptData() {
            let res = await service.get('/api/Senparc.Xncf.PromptRange/LlmModelAppService/Xncf.PromptRange_LlmModelAppService.GetIdAndName')
            /*console.log('getModelOptData:', res)*/
            if (res.data.success) {
                //console.log('getModelOptData:', res.data)
                let _optList = res.data.data || []
                this.modelOpt = _optList.map(item => {
                    return {
                        id: item.id,
                        label: item.name,
                        value: item.id,
                        disabled: false
                    }
                })
            } else {
                alert('error');
            }
        },
        // ���
        async testHandel() {
            //promptid: ''// ѡ��г�
            //modelid: ''// ѡ��ģ��
            //content: ''// prompt ��������
            //remarks: '' // prompt ����ı�ע
            //// �������� ��ͼ�����б�
            //parameterViewList: [] 
            //tips: ''
            //    formField: 'topP'
            //        label: 'Top_p'
            //            value: ''
            //                isSlider: true
            //                    sliderMin: 0
            //                        sliderMax: 1
            //                            sliderStep: 0.1
            // ������������
            let res = await service.post('/api/Senparc.Xncf.PromptRange/PromptItemAppService/Xncf.PromptRange_PromptItemAppService.Add', this.parameter)
            //console.log('testHandel res ', res.data)

            if (res.data.success) {
                //console.log('testHandel res data:', res.data.data)
                //let { resultString = '', addTime = '', costTime = '' } = res.data.data || {}
                //this.outPutVal = resultString
                // ��������ʷ���¼��
                //this.historyData.push({
                //    id: this.historyData.length + 1,
                //    time: new Date(addTime).toLocaleString(),
                //    costTime,
                //    ask: content || '',
                //    answer: resultString
                //})
            } else {
                alert('error!');
            }
        },
        // ��� ѡ���л�
        outputSelectSwitch(index) {
            if (this.outputActive !== '' && this.outputActive !== index) {
                this.outputList[this.outputActive].isScoreView = false
            }
            this.outputActive = index
        },
        // ��ʾ������ͼ
        showRatingView(index) {
            //event.stopPropagation()
            this.outputList[index].isScoreView = true
        },
        // ��� �л�ai����
        alBtnScoring(index) {
            this.outputList[index].scoreType = '1'
        },
        // ��� ai���� ���ӽ����
        addAlScoring(index) {
            let _len = this.outputList[index].alResultList.length
            this.outputList[index].alResultList.push({
                id: _len + 1,
                label: `Expected Answer ${_len + 1}`,
                value: ''
            })
        },
        // ��� �л��ֶ�����
        manualBtnScoring(index) {
            this.outputList[index].scoreType = '2'
        },
        // ��������
        async saveManualScore() {
            //console.log('manualScorVal', this.promptSelectVal, this.manualScorVal)

            let res = await service.post('/api/Senparc.Xncf.PromptRange/PromptItemAppService/Xncf.PromptRange_PromptItemAppService.Scoring', {
                promptItemId: this.promptSelectVal,
                humanScore: this.manualScorVal
            })
            //console.log('saveManualScore res ', res.data)
            if (res.data.success) {
                //console.log('testHandel res data:', res.data.data)
                //let { resultString = '', addTime = '' } = res.data.data || {}
                //this.outPutVal = resultString
                //// ��������ʷ���¼��
                //this.manageTableData.push({
                //    ...this.promptDetail,
                //    score: this.manualScorVal
                //})
            } else {
                alert('error!');
            }
        },
        // ��ȡ��������
        getScoringTrendData() {
            let scoreChart = document.getElementById('scoreChart');
            let chartOption = {
                xAxis: {
                    name: 'ƽ����',
                    type: 'category',
                    data: ['1-4', '1-4-2', '1-4-3', '1-4-4', '1-4-5', '1-4-6', '1-4-7', '1-4-8', '1-4-9', '1-4-10', '1-4-11', '1-4-12']
                },
                yAxis: {
                    name:'�汾',
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} Ԫ'
                    }
                },
                series: [{
                    name: '��������ͼ',
                    type: 'line',
                    data: [1, 8, 6, 7, 0, 0, 3, 7, 4, 9, 1, 8]
                }]
            };

            let chartInstance = echarts.init(scoreChart);
            chartInstance.setOption(chartOption);
        },





        closeDialog() {
            this.$refs.newDialogModelForm.resetFields();
        },
        // 
        async getPromptetail(item) {
            //if (item) {

            //}
            let res = await service.get(`/api/Senparc.Xncf.PromptRange/PromptItemAppService/Xncf.PromptRange_PromptItemAppService.Get?id=${item}`,)
            console.log('getPromptetail:', res)
            if (res.data.success) {
                //console.log('getModelOptData:', res.data)
                this.promptDetail  = res.data.data
            } else {
                alert('error');
            }
        },
        // prompt���� ��������
        btnBatchExport() {
            // to do �Խӽӿ�
        },
        // prompt���� ����ɾ��
        btnBatchDelete() {
            // to do �Խӽӿ�
        },
        // ɾ�� prompt btn
        async btnDeleteHandle(row) {
            
            const res = await service.request({
                method: 'delete',
                url: '/api/Senparc.Xncf.PromptRange/PromptItemAppService/Xncf.PromptRange_PromptItemAppService.Del',
                data: idsToDelete // �� ID �б���Ϊ���������ݷ���
            });
            if (res.data.success) {
                this.getList()
            } else {
                alert("error")
            }
        },
        // ���� prompt btn
        btnDetailHandle() {

        },
        // �༭ prompt btn
        btnEditHandle(row) {
            // this.dialogFormTitle = '�༭ģ��'
            // this.dialogFormVisible = true
        },
        // ���  prompt | prompt���� tabs �л�
        tabsChange(indexStr = '1') {
            if (indexStr === '1') {
                this.getModelOptData();
                this.getHistoryData()
                this.getVersionData()
            }
            if (indexStr === '2') {
                this.getPromptOptData()
                this.getManageData()
            }
            this.tabsActive = indexStr
        },
        // ��ʷ��¼ | �汾��Ϣ tabs �л�
        recordInfoTabsChange(indexStr = '1') {
            if (indexStr === '1') {
                this.getHistoryData()
            }
            if (indexStr === '2') {
                this.getVersionData()
            }
            this.recordInfoTabsActive = indexStr

        },
 // ��ȡ 
        getManageData() {
            //this.manageTableData = []
            this.manageTableTotal = 0
            // to do �Խӽӿ� queryList
            //const _tableData = await service.get('/Admin/XncfModule/Index?handler=Mofules');
            //this.tableData = tableData.data.data.result;
        },
        // ��ȡ Prompt �б�
        async getPromptOptData() {
            // to do  �Խӽӿ�
            
            let res = await service.get('/api/Senparc.Xncf.PromptRange/PromptItemAppService/Xncf.PromptRange_PromptItemAppService.GetIdAndName')
            /*console.log('getModelOptData:', res)*/
            if (res.data.success) {
                //console.log('getModelOptData:', res.data)
                let _optList = res.data.data || []
                this.promptOpt = _optList.map(item => {
                    return {
                        id: item.id,
                        label: item.name,
                        value: item.id,
                        disabled: false
                    }
                })
            } else {
                alert('error');
            }
        },
       // ��ȡ��ʷ��¼
        getHistoryData() {
            // to do  �Խӽӿ�
            this.historyData = []
        },
        // ��ȡ�汾��Ϣ
        async getVersionData() {
            let res = await service.get('/api/Senparc.Xncf.PromptRange/PromptItemAppService/Xncf.PromptRange_PromptItemAppService.GetVersionInfoList')
            //console.log('getVersionData:', res)
            if (res.data.success) {
                //console.log('getVersionData:', res.data)
                this.versionData = res.data.data || []
            } else {
                alert('error!');
            }
        },
        // table �Զ����к�
        indexMethod(index) {
            let { page, size } = this.manageQueryList
            return (page - 1) * size + index + 1;
            //return  index + 1;
        },
        // table ѡ����
        handleSelectionChange(val) {
            let { page } = this.manageQueryList
            this.multipleSelection[page] = val;
            // ���� ҳ�� ��¼��Ӧҳѡ�������
            //console.log('tbale ѡ��', this.multipleSelection)
        },
        // ��ҳ ҳ��С
        handleSizeChange(val) {
            this.manageQueryList.size = val
            this.getManageData()
        },
        // ��ҳ ҳ��
        handleCurrentChange(val) {
            this.manageQueryList.page = val
            this.getManageData()
        },
    }
});