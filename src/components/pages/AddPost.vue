<template>
  <v-container class="add-post my-5">
    <v-tabs
      v-model="tab"
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab :key="0">
        Post 
      </v-tab>
      <v-tab :key="1">
        Image/Video Post 
      </v-tab>
    </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(component, ind) in components" :key="ind">
          <component :is="component"></component>
        </v-tab-item>  
      </v-tabs-items>
  </v-container>  
</template>

<script>
import addTextPost from "../posts/addTextPost"
import addMediaPost from "../posts/addMediaPost";
export default {
    data: () => ({
      tab: null,
      components: [addTextPost, addMediaPost]  
    }),
    methods: {

    }
}
</script>