
// 同步加载
// import _ from 'lodash'
// import $ from 'jquery'
import { ui } from './jquery.ui'
ui()

const dom = $('div')
dom.html(_.join(['qiqi', 'zhang', 'haha'], '_'))
$('body').append(dom)