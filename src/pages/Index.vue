<template>
  <q-page :class=" 'bg-'+store.state.primary ">

    
    <div
    @dblclick="this.store.state.step ++"  
    :class="this.$q.screen.xs ? ('fit q-pa-lg' ) : 'q-pa-xl' "
    :style="this.$q.screen.xs ? ('' ) : 'margin-right: auto; margin-left: auto;  width:61.8%' ">

    <q-slide-item v-if="store.state.currentTodo" @left="store.methods.addCompletedTask(store.state.currentTodo)" 
        :class="'q-ma-md  text-center text-white bg-'+store.state.secondary"
        :style="'height:50px ;'"
        @right="store.methods.deleteTask(store.state.currentTodo)" left-color="green" right-color="red"
        >
        <template v-slot:left>
          <div class="row items-center">
            <q-icon left name="done" /> Done
          </div>
        </template>
        <template v-slot:right>
          <div class="row items-center">
            Delete <q-icon right name="delete" />
          </div>
        </template>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="done" />
          </q-item-section>
          <q-item-section :class="'text-center text-white bg-'+store.state.secondary"><strong>{{store.state.currentTodo}}</strong> </q-item-section>
          <q-item-section avatar>
            <p class="text-center" style="font-size: 10px ; opacity: 50%">swipe <br> right done - left delete</p> 
          </q-item-section>
        </q-item>
      </q-slide-item>
      
      <q-stepper
        v-model="getStep"
        vertical
        :inactive-color="store.state.secondary.replace('8', '5')"
        :active-color="store.state.secondary"
        :class="'bg-'+store.state.primary"
      >
        <q-step
          :name="1"
          title="Decide on the Task to be done"
          prefix="1"
          :header-nav="store.state.step > 1"
        >
          <select-todo v-if="!store.state.addNewTodo && store.state.todos.length > 0 "/>
          <add-new v-if="store.state.addNewTodo || store.state.todos.length == 0"/>

          <div v-if="!store.state.addNewTodo && store.state.todos.length > 0" class="flex justify-between">  

            <q-btn v-if="store.state.currentTodo" :color="store.state.secondary" 
            label="Next" 
            flat
            @click="store.state.step ++" />
            <q-btn  :color="store.state.secondary" 
            label="Add New" 
            flat
            @click="store.state.addNewTodo = true" />
          </div>
        </q-step>

        <q-step
          :name="2"
          :title="`Focus for ${store.state.focus} minutes`"
          prefix="2"
          :header-nav="store.state.step > 2"
        > 
          <!-- <Timer :total="25" /> -->
          <Timer class="flex flex-center" style="height: 500px"
          :total="store.state.focus " />
        </q-step>

        <q-step
          :name="3"
          title="Take a short break, reward yourself"
          prefix="3"
          :header-nav="store.state.step > 3"
        >
          <Wheel />
        </q-step>
        <q-step
          :name="4"
          :title="`Rest ${ store.state.isLong ? store.state.long : store.state.short}  minutes`"
          caption=""
          prefix="4"
          :header-nav="store.state.step > 4"
          class=" q-gutter-md "
        >
          <div class="text-center text-red-10  q-gutter-xs">
            <h5><strong style="width:%100; ">{{ store.state.reward.value }}</strong></h5>
          <!-- <Timer :total="5" /> -->
          <q-btn flat dense rounded :color="store.state.secondary" 
          class="q-pa-md"
          label="long - short" @click="store.state.isLong = !store.state.isLong" />
          </div>
          <Timer class="flex flex-center" v-if="store.state.isLong" :total="store.state.long" style="height: 500px" />
          <Timer class="flex flex-center" v-if="!store.state.isLong" :total="store.state.short" style="height: 500px" />
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, inject } from "vue";
import Timer from "components/Timer.vue";
import Wheel from "components/Wheel.vue";
import SelectTodo from "components/selectTodo.vue";
import AddNew from "src/components/AddNew.vue";
export default defineComponent({
  name: "PageIndex",
  components: {
    Timer,
    Wheel,
    SelectTodo,
    AddNew,
  },
  setup() {
    const store = inject("store");
    return {
      store,
    };
  },
  computed:{
    getStep() {
      return (this.store.state.step % 4) + 1
    }
  }
});
</script>
