<template>
  <div class="box">
    <div class="header">
      <p>主题切换</p>
      <div>
        <el-select
          v-model="currentSkinName"
          style="width: 120px"
          placeholder="请选择"
          @change="switchTheme"
        >
          <el-option
            v-for="(item, index) in Object.keys(themeColorObj)"
            :key="index"
            :label="themeColorObj[item].title"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <el-scrollbar style="height: 92vh">
      <el-card class="container">
        <el-form
          ref="form"
          :model="form"
          label-position="top"
          label-width="120px"
        >
          <el-row>
            <el-col :xs="24" :lg="12">
              <el-form-item label="Button按钮">
                <el-button>默认按钮</el-button>
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
              </el-form-item>
              <el-form-item label="链接">
                <el-link href="https://element.eleme.io" target="_blank"
                  >默认链接</el-link
                >
                <el-link type="primary">主要链接</el-link>
                <el-link type="success">成功链接</el-link>
                <el-link type="warning">警告链接</el-link>
                <el-link type="danger">危险链接</el-link>
                <el-link type="info">信息链接</el-link>
              </el-form-item>
              <el-form-item label="Radio单选框">
                <el-radio v-model="radio" label="1">备选项</el-radio>
                <el-radio v-model="radio" label="2">备选项</el-radio>
              </el-form-item>

              <el-form-item label="多选框">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="禁用" disabled></el-checkbox>
                  <el-checkbox label="选中且禁用" disabled></el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="输入框">
                <el-input
                  placeholder="请选择日期"
                  suffix-icon="el-icon-date"
                  v-model="input"
                ></el-input>
              </el-form-item>

              <el-form-item label="复合输入框">
                <el-input placeholder="请输入内容" v-model="input">
                  <template slot="prepend">Http://</template>
                </el-input>
              </el-form-item>

              <el-form-item label="文本域">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="textarea1"
                ></el-input>
              </el-form-item>

              <el-form-item label="计数器">
                <el-input-number
                  v-model="num"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
                <el-input-number
                  v-model="num"
                  :disabled="true"
                ></el-input-number>
              </el-form-item>

              <el-form-item label="Select选择器">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="级联选择器">
                <el-cascader :options="options"></el-cascader>
              </el-form-item>
              <el-form-item label="Switch开关">
                <el-switch
                  active-text="按月付费"
                  inactive-text="按年付费"
                ></el-switch>
              </el-form-item>
              <el-form-item label="滑块">
                <div class="block">
                  <span class="demonstration">默认</span>
                  <el-slider></el-slider>
                </div>
                <div class="block">
                  <span class="demonstration">自定义初始值</span>
                  <el-slider></el-slider>
                </div>
                <div class="block">
                  <span class="demonstration">隐藏 Tooltip</span>
                  <el-slider :show-tooltip="false"></el-slider>
                </div>
                <div class="block">
                  <span class="demonstration">禁用</span>
                  <el-slider disabled></el-slider>
                </div>
              </el-form-item>
              <el-form-item label="日期选择器">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="时间选择器">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="form.date2"
                  style="width: 100%"
                ></el-time-picker>
              </el-form-item>
              <el-form-item label="树形结构">
                <el-tree :data="options" :props="defaultProps"></el-tree>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :lg="12">
              <el-form-item label="表格">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="日期" width="180">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="180">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                  ></el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label="卡片">
                <!-- 卡片 -->
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                      >操作按钮</el-button
                    >
                  </div>
                  <div v-for="o in 4" :key="o" class="text item">
                    {{ "列表内容 " + o }}
                  </div>
                </el-card>
              </el-form-item>
              <el-form-item label="分页">
                <el-pagination layout="prev, pager, next" :total="50">
                </el-pagination>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="1000"
                >
                </el-pagination>
              </el-form-item>
              <el-form-item label="menu">
                <el-menu default-active="2">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                      <template slot="title">分组一</template>
                      <el-menu-item index="1-1">选项1</el-menu-item>
                      <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                  </el-menu-item>
                </el-menu>
              </el-form-item>
              <el-form-item label="tabs标签">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="用户管理" name="first"
                    >用户管理</el-tab-pane
                  >
                  <el-tab-pane label="配置管理" name="second"
                    >配置管理</el-tab-pane
                  >
                  <el-tab-pane label="角色管理" name="third"
                    >角色管理</el-tab-pane
                  >
                </el-tabs>
              </el-form-item>
              <el-form-item label="dialog">
                <el-button type="text" @click="dialogVisible = true"
                  >点击打开 Dialog</el-button
                >
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  width="30%"
                >
                  <span>这是一段信息</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false"
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </el-form-item>
              <el-form-item label="折叠面板">
                <el-collapse v-model="activeNames">
                  <el-collapse-item title="一致性 Consistency" name="1">
                    <div>
                      与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                    </div>
                    <div>
                      在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="反馈 Feedback" name="2">
                    <div>
                      控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
                    </div>
                    <div>
                      页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "ElTheme",
  data () {
    return {
      radio: "1",
      textarea1: "1",
      checkList: ["选中且禁用", "复选框 A"],
      input: "",
      num: 1,
      value1: new Date(),
      value2: 50,
      value3: 36,
      value4: 48,
      value5: 42,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      activeName: "first",
      activeNames: [1],
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      currentSkinName: 'defaultTheme',
      themeColorObj: { // 此处代码应该放在store里，这里做演示
        defaultTheme: {
          title: '浅色主题', // 主题名称
        },
        darkTheme: {
          title: '深色主题',
        }
      }
    };
  },
  methods: {
    switchTheme () {
      let themeName = this.currentSkinName || 'defaultTheme'

      const typeObj = {
        darkTheme: './theme/mengnan/theme/index.css', 
        defaultTheme: './theme/chunyu/theme/index.css',
      }
      document.getElementById('themeStyle').href = typeObj[themeName]
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: var(--mainBgColor);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2vw;
    height: 7vh;
    font-size: 30px;
    font-weight: bold;
    color: var(--mainTextColor);
    background: var(--mainColor);
  }

  .container {
    margin: 0.5vw 1vh;
    width: 99vw;
  }
}
</style>