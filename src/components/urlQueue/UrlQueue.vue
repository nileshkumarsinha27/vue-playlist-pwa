<template>
  <div>
    <p>{{playListText}}</p>
    <ul v-if="queue.length>0">
      <li
        v-for="(item,index) in queue"
        :key="index"
        :draggable="queue.length>1 && isDraggable"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @dragstart="()=>{handleDragStart(item)}"
        :data-index="index"
      >
        <span role="button" @click="()=>{playVideo(item)}">{{item.value}}</span>
        <img :src="deleteIcon" :alt="imageAlt" :title="imageAlt" @click="()=>{handleDelete(item)}" />
      </li>
    </ul>
  </div>
</template>
<script>
import Store from "@/store.js";
import { mapGetters } from "vuex";
import deleteIcon from "@/assets/delete_icn.svg";
import CONSTANTS from "@/constants.js";
import ACTIONS from "@/actions.js";
export default {
  name: "UrlQueue",
  data: () => ({
    imageAlt: "delete",
    deleteIcon,
    playListText: CONSTANTS.URL_LIST.PLAYLIST_TEXT,
    isDraggable: CONSTANTS.URL_LIST.IS_DRAGGABLE,
    itemDragged: {},
    targetIndex: -1
  }),
  methods: {
    handleDelete: function(entity) {
      const newQueue = [...this.queue].filter(elem => elem.id !== entity.id);
      this.dispatchModifyAction(newQueue);
    },
    handleDrop: function(e) {
      this.targetIndex = Number(e.currentTarget.getAttribute("data-index"));
      this.modifyArray();
    },
    handleDragOver: function(e) {
      e.preventDefault();
    },
    handleDragStart: function(item) {
      this.itemDragged = Object.assign({}, item);
    },
    modifyArray: function() {
      const newQueue = [...this.queue].filter(
        elem => elem.id !== this.itemDragged.id
      );
      newQueue.splice(this.targetIndex, 0, this.itemDragged);
      this.dispatchModifyAction(newQueue);
    },
    dispatchModifyAction: function(arr) {
      const { dispatch } = Store;
      dispatch(ACTIONS.URL_LIST.MODIFY_LIST, [...arr]);
    },
    playVideo: function(item) {
      const newQueue = [...this.queue].filter(elem => elem.id !== item.id);
      newQueue.unshift(item);
      this.dispatchModifyAction(newQueue);
    }
  },
  computed: mapGetters({
    queue: "getQueue"
  })
};
</script>
<style lang="scss" scoped>
p {
  margin: 0 auto;
  text-align: center;
  padding: 10px 0;
  width: 50%;
  box-sizing: border-box;
  border-bottom: 1px solid lightgrey;
  color: #000;
}
ul {
  width: 100%;
  margin: 10px 0;
  box-sizing: border-box;
  li {
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin: 10px 0;
    font-size: 14px;
    color: #000;
    cursor: pointer;
    img {
      display: inline-block;
      box-sizing: border-box;
      opacity: 0;
    }
    &:hover {
      img {
        opacity: 1;
      }
    }
  }
}
@media (max-width: 1024px) {
  ul {
    li {
      font-size: 10.5px;
      display: block;
      span {
        display: inline-block;
        width: 60%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 90%;
      }
      img {
        display: inline-block;
        width: 10%;
      }
    }
  }
  p {
  font-size: 12px;
  margin: 0;
  width: 100%;
}
}
</style>