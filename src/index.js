
// 同步加载
import _ from 'lodash'
import $ from 'jquery'

const dom = $('div')
dom.html(_.join(['qiqi', 'zhang', 'haha'], '_'))
$('body').append(dom)