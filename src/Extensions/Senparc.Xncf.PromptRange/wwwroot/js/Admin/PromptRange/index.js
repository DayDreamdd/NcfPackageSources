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
            dialogFormTitle: '����ģ��',
            formLabelWidth: '',
            newModelForm: {
                modelName: '',
                modelAPI: '',
                modelAPIkey: ''
            },
            rules: {
                modelName: [
                    { required: true, message: '������ģ������', trigger: 'blur' }
                ],
                modelAPI: [
                    { required: true, message: '������ģ��API', trigger: 'blur' }
                ],
                modelAPIkey: [
                    { required: true, message: '������API key', trigger: 'blur' }
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
                    alert('submit!');
                    this.dialogFormVisible = false
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // ����ģ�� btn
        createBtnFrom() {
            this.dialogFormTitle = '����ģ��'
            this.dialogFormVisible = true
        },
        // �༭ģ�� btn
        editBtnFrom(row) {
            this.dialogFormTitle = '�༭ģ��'
            this.newModelForm = {
                ...row
            }
            this.dialogFormVisible = true
        },
        // ɾ��ģ�� 
        deleteHandle(row) {
            console.log('ɾ��', row)
        },
        // btn ����ɾ��
        btnBatchdelete() {
            console.log('����ɾ��', this.multipleSelection)
            // ѭ�� this.multipleSelection
            // this.$refs.multipleTable.toggleRowSelection(row);
        },
        // async  ��ȡtable�б�����
        getList() {
            this.tableData = [{
                id: 1,
                modelName: 'Prompt����1',
                developer: '��С��',
                isItPublic: false,
                date: '2016-05-03'
            }, {
                id: 2,
                modelName: 'Prompt����2',
                developer: '��С��',
                isItPublic: true,
                date: '2016-05-04'
            }, {
                id: 3,
                modelName: 'Prompt����3',
                developer: '��С��',
                isItPublic: false,
                date: '2016-05-05'
            }]
            this.tableTotal = 3
            // to do �Խӽӿ� queryList
            //const _tableData = await service.get(`/Admin/PromptRange/Index?handler=Mofules`);
            //this.tableData = tableData.data.data.result;
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
        }
    }
});