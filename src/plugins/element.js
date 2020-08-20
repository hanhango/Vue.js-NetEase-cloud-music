import Vue from 'vue'
import {
  Button,
  Row,
  Col,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input,
  Message,
  Card,
  Image,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Tag,
  Slider,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  Pagination,
  Dialog,
  MessageBox,
  Container,
  Popover
} from 'element-ui'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Image)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Slider)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Dropdown)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Container)
Vue.use(Popover)
Vue.prototype.$message = Message
Vue.prototype.$confirm  = MessageBox.confirm