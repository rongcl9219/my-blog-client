import Vue from 'vue'

import {
    Pagination,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Icon,
    Row,
    Col,
    Upload,
    Spinner,
    Card,
    Link,
    Image,
    Scrollbar,
    Avatar,
    Loading,
    MessageBox,
    Notification
} from 'element-ui'

import resetMessage from './resetMessage'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Spinner)
Vue.use(Card)
Vue.use(Link)
Vue.use(Image)
Vue.use(Scrollbar)
Vue.use(Avatar)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = resetMessage
