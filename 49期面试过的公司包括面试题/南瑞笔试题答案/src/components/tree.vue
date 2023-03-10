<template>
  <div
    class="b-tree"
    ref="scroller"
    :style="{ height: option.height + 'px' }"
    @scroll="handleScroll"
  >
    <div class="b-tree__phantom" :style="{ height: contentHeight }"></div>
    <div
      class="b-tree__content"
      :style="{ transform: `translateY(${offset}px)` }"
    >
      <div
        v-for="(item, index) in visibleData"
        :key="item.id"
        class="b-tree__list-view"
        :style="{
          paddingLeft: 18 * (item.level - 1) + 'px',
          height: option.itemHeight + 'px',
        }"
      >
        <i
          :class="item.expand ? 'b-tree__expand' : 'b-tree__close'"
          @click="toggleExpand(item)"
          v-if="item.children && item.children.length"
        />
        <span v-else style="margin-right: 5px"></span>
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<style>
.b-tree {
  position: relative;
  overflow-y: scroll;
}
.b-tree__phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.b-tree__content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  min-height: 100px;
}
.b-tree__list-view {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.b-tree__content__item {
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  cursor: pointer;
}
.b-tree__content__item:hover,
.b-tree__content__item__selected {
  background-color: #d7d7d7;
}
.b-tree__content__item__icon {
  position: absolute;
  left: 0;
  color: #c0c4cc;
  z-index: 10;
}
.b-tree__close {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  margin-right: 5px;
  border-width: 5px;
  border-color: transparent transparent transparent #c0c4cc;
  border-style: dashed dashed dashed solid;
}
.b-tree__expand {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  margin-right: 5px;
  border-width: 5px;
  border-color: #c0c4cc transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}
</style>
<script>
let lastTime = 0;
export default {
  name: "vueBigTree",
  props: {
    tree: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    defaultExpand: {
      type: Boolean,
      required: false,
      default: false
    },
    timeout: { //????????????
      type: Number,
      default: 17
    },
    option: {
      // ????????????
      type: Object,
      // required: true,
      default () {
        return {
          height: 500, //?????????????????????
          itemHeight: 25 // ??????item?????????
        }
      }
    }
  },
  data () {
    return {
      offset: 0, // translateY?????????
      contentHeight: "0px",
      visibleData: []
    };
  },
  computed: {
    flattenTree () {
      const flatten = function (
        list,
        childKey = "children",
        level = 1,
        // parent = null,
        defaultExpand = true
      ) {
        let arr = [];
        list.forEach(item => {
          item.level = level;
          if (item.expand === undefined) {
            item.expand = defaultExpand;
          }
          if (item.visible === undefined) {
            item.visible = true;
          }
          // if (!parent.visible || !parent.expand) {
          //   item.visible = false;
          // }
          // item.parent = parent;
          arr.push(item);
          if (item[childKey]) {
            arr.push(
              ...flatten(
                item[childKey],
                childKey,
                level + 1,
                item,
                defaultExpand
              )
            );
          }
        });
        return arr;
      };
      return flatten(this.tree, "children", 1, {
        level: 0,
        visible: true,
        expand: true,
        children: this.tree
      });
    },
    visibleCount () {
      return Math.floor(this.option.height / this.option.itemHeight);
    }
  },
  mounted () {
    this.updateView();
  },
  methods: {
    updateView () {
      this.getContentHeight();
      this.$emit("update", this.tree);
      this.handleScroll();
    },
    handleScroll () {
      let currentTime = +new Date()
      if (currentTime - lastTime > this.timeout) {
        this.updateVisibleData(this.$refs.scroller.scrollTop);
        lastTime = currentTime
      }
    },
    updateVisibleData (scrollTop = 0) {
      let start = Math.floor(scrollTop / this.option.itemHeight) - Math.floor(this.visibleCount / 2);
      start = start < 0 ? 0 : start;
      const end = start + this.visibleCount * 2;
      const allVisibleData = (this.flattenTree || []).filter(
        item => item.visible
      );
      this.visibleData = allVisibleData.slice(start, end);
      this.offset = start * this.option.itemHeight;
    },
    getContentHeight () {
      this.contentHeight =
        (this.flattenTree || []).filter(item => item.visible).length *
        this.option.itemHeight +
        "px";
    },
    toggleExpand (item) {
      const isExpand = item.expand;
      if (isExpand) {
        this.collapse(item, true); // ??????
      } else {
        this.expand(item, true); // ??????
      }
      this.updateView();
    },
    //????????????
    expand (item) {
      item.expand = true;
      this.recursionVisible(item.children, true);
    },
    //????????????
    collapse (item) {
      item.expand = false;
      this.recursionVisible(item.children, false);
    },
    //????????????
    collapseAll (level = 1) {
      this.flattenTree.forEach(item => {
        item.expand = false;
        if (item.level != level) {
          item.visible = false;
        }
      });
      this.updateView();
    },
    //????????????
    expandAll () {
      this.flattenTree.forEach(item => {
        item.expand = true;
        item.visible = true;
      });
      this.updateView();
    },
    //????????????
    recursionVisible (children, status) {
      children.forEach(node => {
        node.visible = status;
        if (node.children) {
          this.recursionVisible(node.children, status);
        }
      });
    }
  }
};
</script>