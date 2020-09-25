<template>
  <div class="user_name">
    <Icon type="ios-contact" :size='27'/>
    <span>{{login_name}}</span>
  </div>
</template>

<script>
import './userName.less'
import { mapActions ,mapMutations} from 'vuex'
import {localSave,localRead} from '@/libs/util'
export default {
  name: 'UserName',
  data(){
    return{
      login_name: localRead("user")
    }
  },
  mounted(){
    // this.getBusiDomain();
 
  }
}
</script>
