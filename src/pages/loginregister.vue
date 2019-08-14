<template>
<!--  登录 -->
<div class="login">
	<div class="wrapper fadeInDown">
		<ul id="formContent">
			<li class="ha-login-header">
				<span :class="{active: loginway == 'log'}" @click="loginway = 'log'">登录</span>
				<span :class="{active: loginway == 'sin'}" @click="loginway = 'sin'">注册</span>
			</li>
			<li class="ha-login-icon">
				<img src="../assets/icon.svg" alt="User Icon" />
			</li>
			<li class="ha-login-form">
				<el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm">
					<el-form-item prop="name">
						<el-input size="small" v-model="ruleForm.name" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input size="small" type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item prop="gender" v-if="loginway == 'sin'">
						<el-radio-group v-model="ruleForm.gender">
							<el-radio label="1">男</el-radio>
							<el-radio label="2">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item prop="birth" v-if="loginway == 'sin'">
						<el-date-picker type="date" size="small" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-form>
			</li>
			<li>
			 	<el-button type="primary" size="small" ref="login" @click="login">{{loginway == 'log' ? '登录' : '注册'}}</el-button>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default {
	name: "login",
	data() {
		var checkName = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('用户名不能为空'));
			}else{
				if(value.length > 20){
					return callback(new Error('用户名不能超过20个字符'));
				}else{
					this.$axios('get',"/api/users", {name: value}).then(res=>{
						console.log(res)
						if(this.loginway == 'log'){
							if(res.data){
								if(res.data.status == 1){
									return callback();
								}else if(res.data.status == 0){
									return callback(new Error('该账号已经被冻结，请联系管理员'));
								}else{
									return callback(new Error('该账号审核未通过，请耐心等待'));
								}
							}else{
								return callback(new Error('输入账号有误，请核对后登陆'));
							}
						}else{
							if(res.data){
								return callback(new Error('该账号已经存在'));
							}else{
								return callback();
							}
						}
					})
				}
			}
		};
		return {
			loginway: 'log', // sin -- 注册
			ruleForm: {
				name: 'admin',
				password: 'admin',
				gender: '1',
				birth: '',
			},
			rules: {
				name: [
					{ required: true, validator: checkName, trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
				],
				birth: [
					{ type: 'date', required: true, message: '请选择生日', trigger: 'change' }
				],
			}
		};
	},
	methods: {
		login() {
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
					if(this.loginway == 'sin'){
						this.$axios('post',"/api/users", {
							name: this.ruleForm.name,
							gender: this.ruleForm.gender,
							password: this.ruleForm.password,
							birth: this.$moment(this.ruleForm.birth).format('YYYY-MM-DD')
						}).then(res=>{
							this.$notify({
								title: '成功',
								message: '注册成功！',
								type: 'success'
							});
							this.$refs.ruleForm.resetFields();
						})
					}else{
						this.$axios('post',"/api/login", {
							name: this.ruleForm.name,
							password: this.ruleForm.password
						}).then(res=>{
							console.log(res)
							if(res && res.code == 'ok'){
								// 登陆验证通过
								this.$notify({
									title: '成功',
									message: '认证成功！',
									type: 'success'
								});
								window.localStorage.setItem('user_msg', JSON.stringify(res.data));
								this.$router.push('/ha/home')
							}
						})
					}
				} else {
					return false;
				}
			});
		}
	}
};
</script>

<style lang="scss" scope>
@import "../theme/loginregister.scss";
</style>
