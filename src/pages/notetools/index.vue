<template>
  	<div class="app-container notetools">
	  	<div class="notetools-left">
			<el-collapse v-model="activeNames" accordion>
				<el-collapse-item v-for="item in items" :key="item.code" :title="item.title" :name="item.name">
					<el-button v-for="d in item.items" :key="d.code" size="small" round
						@click="addView(d)">{{d.name}}</el-button>
				</el-collapse-item>
			</el-collapse>
		</div>
	  	<div class="notetools-content">
			<div class="notetools-text-content" id="myEdit" contentEditable=true>
				<h3>《道德经》全文</h3>
				<p>
					01.道可道，非常道。
					<i>哈哈哈哈哈</i>名可名，非常名。无名天地之始。有名万物之母。故常无欲以观其妙。常有欲以观
					其徼。此两者同出而异名，同谓之玄。玄之又玄，众妙之门。
				</p>

				<p>
					02.天下皆知美之为美，斯恶矣；皆知善之为善，斯不善已。故有无相生，难易相成，长短相形，高下相
					倾，音声相和，前後相随。是以圣人处无为之事，行不言之教。万物作焉而不辞。生而不有，为而不恃，
					功成而弗居。夫唯弗居，是以不去。
				</p>

				<p>
					03.不尚贤， 使民不争。不贵难得之货，使民不为盗。不见可欲，使民心不乱。是以圣人之治，虚其心，
					实其腹，弱其志，强其骨；常使民无知、无欲，使夫智者不敢为也。为无为，则无不治。
				</p>

				<p>
					04.道冲而用之，或不盈。渊兮似万物之宗。解其纷，和其光，同其尘，湛兮似或存。吾不知谁之子，象
					帝之先。
				</p>
				<p>
					05.天地不仁，以万物为刍狗。圣人不仁，以百姓为刍狗。天地之间，其犹橐迭乎？虚而不屈，动而愈出
					。多言数穷，不如守中。
				</p>
				<p>06.谷神不死是谓玄牝。玄牝之门是谓天地根。绵绵若存，用之不勤。</p>

				<p>
					07.天长地久。天地所以能长且久者，以其不自生，故能长生。是以圣人後其身而身先，外其身而身存。
					非以其无私邪！故能成其私。
				</p>
				<p>
					08.上善若水。水善利万物而不争，处众人之所恶，故几於道。居善地，心善渊，与善仁，言善信，正善
					治，事善能，动善时。夫唯不争，故无尤。
				</p>
			</div>
			<div class="notetools-text-info">

			</div>
		</div>
		
  </div>
</template>

<script>
import Range from './Range';
export default {
    data(){
        return {
			activeNames: 'base',
			items: [
				{
					code: 'base',
					title: '基本操作',
					name: 'base',
					items: [
						{
							code: 'underline',
							className: 'custom-underline',
							name: '添加下划线',
							style: "",
							id: '',
							clssfiyId: 'base'
						},
						{
							code: 'pen',
							className: 'nite-writer-pen',
							name: '荧光笔',
							style: "",
							id: '',
							clssfiyId: 'base'
						}
					]
				},
				{
					code: 'pizhu',
					title: '增加批注',
					name: 'pizhu',
					items: [
						{
							code: 'underline',
							className: 'custom-underline',
							name: '直接添加批注',
							style: "",
							id: '',
							clssfiyId: 'pizhu'
						},
						{
							code: 'pen',
							className: 'nite-writer-pen',
							name: '直接添加批注带角标',
							style: "",
							id: '',
							clssfiyId: 'pizhu'
						}
					]
				}
			]
        }
    },
    methods:{
        /**
         * 开启涂鸦
         */
        enableDoodle(){
			// let editor=document.getElementById("myEdit")
			// 选中文字加粗 增加b标签
			document.execCommand("Bold", true, null);
			// 〖全选〗命令的实现
			// document.execCommand('selectAll')
			// 〖打开〗命令的实现
			// document.execCommand('open')
			//〖另存为〗命令的实现
			// document.execCommand('saveAs')
			// 〖打印〗命令的实现
			// document.execCommand('print')
			//相当于单击文件中的打开按钮
			// document.execCommand('Open');

			// //将当前页面另存为
			// document.execCommand('SaveAs');

			// //剪贴选中的文字到剪贴板;
			// document.execCommand('Cut','false',null);

			// //删除选中的文字;
			// document.execCommand('Delete','false',null);

			// //改变选中区域的字体;
			// document.execCommand('FontName','false',sFontName);

			// //改变选中区域的字体大小;
			// document.execCommand('FontSize','false',sSize|iSize);

			// //设置前景颜色;
			// document.execCommand('ForeColor','false',sColor);

			// //使绝对定位的对象可直接拖动;
			// document.execCommand('2D-Position','false','true');

			// //使对象定位变成绝对定位;
			// document.execCommand('AbsolutePosition','false','true');

			// //设置背景颜色;
			// document.execCommand('BackColor','false',sColor);

			// //使选中区域的文字加粗;
			// document.execCommand('Bold','false',null);

			// //复制选中的文字到剪贴板;
			// document.execCommand('Copy','false',null);

			// //设置指定锚点为书签;
			// document.execCommand('CreateBookmark','false',sAnchorName);

			// //将选中文本变成超连接,若第二个参数为true,会出现参数设置对话框;
			// document.execCommand('CreateLink','false',sLinkURL);

			// //设置当前块的标签名;
			// document.execCommand('FormatBlock','false',sTagName);

			// //相当于单击文件中的打开按钮
			// document.execCommand('Open');

			// //将当前页面另存为
			// document.execCommand('SaveAs');

			// //剪贴选中的文字到剪贴板;
			// document.execCommand('Cut','false',null);

			// //删除选中的文字;
			// document.execCommand('Delete','false',null);

			// //改变选中区域的字体;
			// document.execCommand('FontName','false',sFontName);

			// //改变选中区域的字体大小;
			// document.execCommand('FontSize','false',sSize|iSize);

			// //设置前景颜色;
			// document.execCommand('ForeColor','false',sColor);

			// //使绝对定位的对象可直接拖动;
			// document.execCommand('2D-Position','false','true');

			// //使对象定位变成绝对定位;
			// document.execCommand('AbsolutePosition','false','true');

			// //设置背景颜色;
			// document.execCommand('BackColor','false',sColor);

			// //使选中区域的文字加粗;
			// document.execCommand('Bold','false',null);

			// //复制选中的文字到剪贴板;
			// document.execCommand('Copy','false',null);

			// //设置指定锚点为书签;
			// document.execCommand('CreateBookmark','false',sAnchorName);

			// //将选中文本变成超连接,若第二个参数为true,会出现参数设置对话框;
			// document.execCommand('CreateLink','false',sLinkURL);

			// //设置当前块的标签名;
			// document.execCommand('FormatBlock','false',sTagName);
        },
        addView(data){
            this.replaceSelectedStrByEle(data)
        },
        /**
         * 用元素替换被选中的文本
         */
        replaceSelectedStrByEle(data) {
            var getRange = () => {
                var me = window;
                var range = new Range(me.document);

				var sel = window.getSelection();
                if (sel && sel.rangeCount) {
                    var firstRange = sel.getRangeAt(0);
                    var lastRange = sel.getRangeAt(sel.rangeCount - 1);
                    range.setStart(firstRange.startContainer, firstRange.startOffset)
                        .setEnd(lastRange.endContainer, lastRange.endOffset);
                }
                return range
            }
            var range = getRange();
            range.applyInlineStyle('span', {
				class: data.className,
				style: {
					color: 'red'
				}

            });
            range.select();
        }

    },
    mounted(){
		// const mode = document.designMode;
		// document.designMode = "on";
		// ​document.designMode = "off";
    }
}
</script>

<style lang="scss" scope>
@import "../../theme/notetools.scss";
</style>

