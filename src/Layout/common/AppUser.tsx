import { Getter } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
import { Icon, Menu, Popover, Modal } from 'ant-design-vue'
import { AppAvatar } from '@/components/common'

@Component
export default class AppUser extends Vue {
	@Getter('user/avatar') avatar!: string
	@Getter('user/nickname') nickname!: string

	private state = {
		popover: false,
		visible: false
	}

	private async onChange(option: { key: string }) {
		this.state.popover = false
		switch (option.key) {
			case 'user':
				this.$router.push('/')
				break
			case 'github':
				window.open('https:play.lisfes.cn')
				break
			default:
				await this.$store.dispatch('user/logout')
				this.$router.push('/main/login')
				break
		}
	}

	protected render() {
		const { state } = this
		return (
			<div class="app-user">
				<div class="app-user-node" style={{ padding: '0 10px' }}>
					<Icon type="bell" />
					<sup class="bell-bot"></sup>
				</div>
				<div class="app-user-node" style={{ padding: '0 10px' }}>
					<Icon type="fullscreen" />
				</div>
				<Popover
					v-model={state.popover}
					destroyTooltipOnHide
					trigger="click"
					placement="bottom"
					overlayClassName="app-popover"
				>
					<Menu slot="content" onClick={this.onChange}>
						<Menu.Item key="user" style={{ color: '#1890ff' }}>
							<Icon type="user"></Icon>
							<span>个人中心</span>
						</Menu.Item>
						<Menu.Item key="github" style={{ color: '#fa8c16' }}>
							<Icon type="github"></Icon>
							<span>项目地址</span>
						</Menu.Item>
						<Menu.Item key="logout" style={{ color: '#f5222d' }}>
							<Icon type="logout"></Icon>
							<span>退出登陆</span>
						</Menu.Item>
					</Menu>
					<div style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
						<AppAvatar
							size={32}
							src={`${this.avatar}?x-oss-process=style/resize`}
							username={this.nickname}
							rounded={false}
							style={{ margin: '0 auto', cursor: 'pointer', borderRadius: '50%' }}
						></AppAvatar>
						<div class="app-user-nickname app-ellipsis">{this.nickname}</div>
					</div>
				</Popover>
				<div class="app-user-node" style={{ padding: '0 10px' }}>
					<Icon type="setting" />
				</div>

				<Modal v-model={state.visible}></Modal>
			</div>
		)
	}
}
