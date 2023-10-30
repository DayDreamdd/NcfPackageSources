var app = new Vue({
    el: "#app",
    data() {
        return {
            // ��ѯ�б� ����
            queryList: {
                page: 1,
                size: 10,
                modelName: ''
            },
            pageSizes: [10, 20, 30, 50],
            tableTotal: 0,
            tableData: [], // ģ���б�
            multipleSelection: {}, // ѡ�е�ģ��
            dialogFormVisible: false,
            dialogFormTitle: 'Create Model',
            formLabelWidth: '',
            editModelName: true,
            modifyId: "",
            modifyFlag: true,
            modifyName:"",
            newModelForm: {
                value:'',
                modelName: '',
                modelAPI: '',
                modelAPIkey: ''
            },
            options: [{
                value: 0,
                label: 'OpenAI'
            }, {
                value: 1,
                label: 'AzureOpenAI'
            }, {
                value: 2,
                label: 'NeuCharOpenAI'
            }, {
                value: 3,
                label: 'HugginFace'
            }],
            rules: {
                modelType: [
                    { required: true, message: 'Please select a model type', trigger: 'change' }
                ],
                modelName: [
                    { required: true, message: 'Please enter a model name', trigger: 'blur' }
                ],
                modelAPI: [
                    { required: true, message: 'Please enter a model API', trigger: 'blur' }
                ],
                modelAPIkey: [
                    { required: true, message: 'Please enter a model API key', trigger: 'blur' }
                ]
            }
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
        // ��ȡtable�б�����
        this.getList();
    },
    methods: {
        closeDialog() {
            this.$refs.newDialogModelForm.resetFields();
        },
        submitForm() {
            this.$refs.newDialogModelForm.validate((valid) => {
                if (valid) {
                    if (this.editModelName) {
                        this.addModel()
                    } else {
                        this.modifyModelName(this.modifyId, this.modifyName, this.modifyFlag)
                    }
                    this.dialogFormVisible = false

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // ����ģ�� btn
        async createBtnFrom() {
            this.dialogFormTitle = 'Create Model'
            this.editModelName = true
            this.dialogFormVisible = true
        },
        async addModel() {
            const request = {
                name: this.newModelForm.modelName,
                endpoint: this.newModelForm.modelAPI,
                apiKey: this.newModelForm.modelAPIkey,
            }
            const res = await service.post('/api/Senparc.Xncf.PromptRange/LlmModelAppService/Xncf.PromptRange_LlmModelAppService.Add', request)
            if (res.data.success) {
                this.getList()
                alert('success!');
            }
        },
        // �༭ģ�� btn
        editBtnFrom(row) {
            this.dialogFormTitle = 'Edit Model'
            this.newModelForm = {
                ...row
            }
            this.editModelName = false
            this.dialogFormVisible = true
            this.modifyId = row.id
            this.modifyFlag = row.show
            this.modifyName = row.name
        },
        async modifyModelName(id,name,flag) {
            const updatedData = {
                id,
                name,
                show: flag

            };
            const res = await service.put('/api/Senparc.Xncf.PromptRange/LlmModelAppService/Xncf.PromptRange_LlmModelAppService.Modify', updatedData)
            if (res.data.success) {
                this.getList()
            } else {
                alert("error")
            }
        },
        // ɾ��ģ�� 
        deleteHandle(row) {
            console.log("row.id", row.id)
            const idsToDelete = []
            idsToDelete.push(row.id)
            this.deletModel(idsToDelete)
        },
        // ɾ��
        async deletModel(idsToDelete) {
            const res = await service.request({
                method: 'delete',
                url: '/api/Senparc.Xncf.PromptRange/LlmModelAppService/Xncf.PromptRange_LlmModelAppService.BatchDelete',
                data: idsToDelete // �� ID �б���Ϊ���������ݷ���
            });
            console.log(res)
            if (res.data.success) {
                this.getList()
            } else {
                alert("error")
            }
        },
        // btn ����ɾ��
        btnBatchdelete() {
            console.log('����ɾ��', this.multipleSelection)
            // ѭ�� this.multipleSelection
            // this.$refs.multipleTable.toggleRowSelection(row);
            const idsToDelete = []
            this.multipleSelection[1].forEach(item => {
                idsToDelete.push(item.id)
            });
            this.deletModel(idsToDelete)
        },
        // async  ��ȡtable�б�����
        async getList() {
            const res = await service.get(`/api/Senparc.Xncf.PromptRange/LlmModelAppService/Xncf.PromptRange_LlmModelAppService.GetLlmModelList?pageIndex=${this.queryList.page}&pageSize=${this.queryList.size}&key=${this.queryList.modelName}`);
            this.tableData = res.data.data.list;
            this.tableTotal = res.data.data.totalCount;
        },

        // table �Զ����к�
        indexMethod(index) {
            let { page, size } = this.queryList
            return (page - 1) * size + index + 1;
            //return  index + 1;
        },
        // table ѡ����
        handleSelectionChange(val) {
            let { page } = this.queryList
            this.multipleSelection[page] = val;
            // ���� ҳ�� ��¼��Ӧҳѡ�������
            console.log('tbale ѡ��', this.multipleSelection)
        },
        // ��ҳ ҳ��С
        handleSizeChange(val) {
            this.queryList.size = val
            this.getList()
        },
        // ��ҳ ҳ��
        handleCurrentChange(val) {
            this.queryList.page = val
            this.getList()
        },
        // �������
        clickSearch() {
            this.getList()
        },
        changeStatue(row, flag) {
            this.modifyModelName(row.id, row.name,flag)
        }
    }
});