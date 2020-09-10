import Vue from 'vue'
import _ from 'lodash'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as freeSolidSvgIcons from '@fortawesome/free-solid-svg-icons'
import * as freeRegularSvgIcons from '@fortawesome/free-regular-svg-icons'
import * as freeBrandSvgIcons from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

for(const icon in freeSolidSvgIcons) {
  if (_.hasIn(freeSolidSvgIcons[icon], 'icon')) {
    library.add(freeSolidSvgIcons[icon])
  }
}
for(const icon in freeRegularSvgIcons) {
  if (_.hasIn(freeRegularSvgIcons[icon], 'icon')) {
    library.add(freeRegularSvgIcons[icon])
  }
}
for(const icon in freeBrandSvgIcons) {
  if (_.hasIn(freeBrandSvgIcons[icon], 'icon')) {
    library.add(freeBrandSvgIcons[icon])
  }
}

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
