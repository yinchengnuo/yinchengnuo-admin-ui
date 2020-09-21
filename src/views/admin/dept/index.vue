<template>
  <div class="app-container">
    <div class="custom-table border">
      <header class="header bt bl">
        <div class="item br bb">部门</div>
        <div class="item br bb">负责人</div>
        <div class="item br bb">联系方式</div>
        <div class="item br bb">状态</div>
        <div class="item br bb">操作</div>
      </header>
      <el-tree
        ref="tree"
        class="bl"
        draggable
        :data="tree"
        :default-expand-all="true"
        @node-drop="treeDrop"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <div class="item dept br bb">
              <div class="dept" :style="{ 'padding-left': (node.level - 1) * 24 + 36 + 'px' }">{{ node.label }}</div>
            </div>
            <div class="item br bb">{{ data.leader }}</div>
            <div class="item br bb">{{ data.phone }}</div>
            <div class="item br bb">{{ data.status == 1 ? '正常' : '停用' }}</div>
            <div class="item br bb" @click.stop="">
              <template>
                <el-button type="text" icon="el-icon-edit" @click="dialog.show(node, data)">修改</el-button>
                <el-button type="text" icon="el-icon-plus" @click="dialog.show(node)">添加</el-button>
                <el-button type="text" icon="el-icon-delete" @click="delTree(node)">删除</el-button>
              </template>
            </div>
          </div>
        </template>
      </el-tree>
    </div>

    <el-dialog width="654px" :title="dialog.title" :visible.sync="dialog.visible" :destroy-on-close="true">
      <el-form
        :ref="dialog.refName"
        :model="dialog.data"
        inline
        :rules="dialog.rules"
      >
        <el-form-item label="部门名称" prop="label">
          <el-input v-model="dialog.data.label" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="leader" label-width="123px">
          <el-input v-model="dialog.data.leader" placeholder="请输入部门负责人" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="dialog.data.phone" placeholder="请输入部门联系方式" maxlength="11" />
        </el-form-item>
        <el-form-item label="部门状态" label-width="123px">
          <el-select v-model="dialog.data.status" placeholder="请选择部门状态">
            <el-option label="正常" value="1" />
            <el-option label="停用" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.comfirm($refs)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { api_getDept, api_updateDept } from '@/api/admin/dept'
import G from '@/plugin/prototype/G'
export default {
  name: 'Department',
  props: {},
  data() {
    return {
      dialog: {
        title: '',
        node: null,
        visible: false,
        refName: 'dialogFrom',
        data: { label: '', status: '', leader: '', phone: '' },
        show(node, edit) {
          this.node = node
          if (edit) {
            this.title = '修改部门信息'
            Object.assign(this.data, edit)
          } else {
            this.title = `新增子部门（${ node.data.label }）`
            Object.assign(this.data, { label: '', status: '1', leader: '', phone: '' })
          }
          this.visible = true
        },
        comfirm($refs) {
          $refs[this.refName].validate(valid => {
            if (valid) {
              if (this.title === '新增子部门') {
                if (this.node.data.children) {
                  this.node.data.children.push(this.data)
                } else {
                  this.node.data.children = [this.data]
                }
                G.$request(api_updateDept({ tree: this.node.data }), () => {
                  this.visible = false
                })
              } else {
                Object.assign(this.node.data, this.data)
                G.$request(api_updateDept({ tree: this.node.data }), () => {
                  this.visible = false
                })
              }
            }
            return
          })
        },
        rules: {
          label: [
            { required: true, message: '请输入部门名称', trigger: 'blur' }
          ],
          leader: [
            { required: true, message: '请输入部门负责人', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入部门联系方式', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入手机号', trigger: 'blur' }
          ]
        }
      },
      tree: []
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getTree()
  },
  methods: {
    getTree() {
      this.$request(api_getDept(), tree => {
        this.tree = tree
      })
    },
    treeDrop() {
      G.$request(api_updateDept({ tree: this.tree[0] }))
    },
    delTree(node) {
      this.$confirm('确定要删除当前角色？', '确定操作', { type: 'warning' }).then(() => {
        node.parent.data.children.splice(node.parent.data.children.indexOf(node.data), 1)
        G.$request(api_updateDept({ tree: this.tree[0] }))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .ba { border: 1px solid #ebeef5; }
    .bt { border-top: 1px solid #ebeef5; }
    .bl { border-left: 1px solid #ebeef5; }
    .br { border-right: 1px solid #ebeef5; }
    .bb { border-bottom: 1px solid #ebeef5; }
    .custom-table {
      .header {
        height: 56px;
        @include flex();
        .item {
          flex: 1;
          height: 100%;
          @include flex();
          color: #909399;
          font-weight: bold;
          box-sizing: border-box;
        }
      }
      ::v-deep {
        .el-tree {
          .el-tree-node__content {
            height: 45px;
            position: relative;
            .el-tree-node__expand-icon {
              font-size: 24px;
            }
            .custom-tree-node {
              @include flex();
              font-size: 14px;
              color: #606266;
              word-spacing: 2px;
              @include abs(0, 0, 100%, 100%);
              .item {
                flex: 1;
                height: 100%;
                @include flex();
                box-sizing: border-box;
                .dept {
                  width: 100%;
                  height: 100%;
                  @include flex();
                  box-sizing: border-box;
                  justify-content: flex-start;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
