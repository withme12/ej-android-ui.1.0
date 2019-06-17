import React from 'react'
import {connect} from 'dva'
import {withRouter,routerRedux} from 'dva/router'
import {TabBar} from 'antd-mobile'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    }
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <p>{pageText}</p>        
      </div>
    );
  }

  handlerTabChange = (tab)=>{
    console.log(this.props);
    this.setState({selectedTab: tab});
    switch(tab){
      case "blueTab":
        this.props.dispatch(routerRedux.push({
          pathname: '/product',
          query: {id: 1}
        }))
        break;
      case "redTab":
          this.props.dispatch(routerRedux.push({
            pathname: '/',
            query: {id: 1}
          }))
          break;
      default:
        break;
    }
  }

  render(){
    return (
      <div>
        <div>
          {/* 动态路由 */}
          {
            this.props.children
          }
        </div>
        <div>
          {/* 导航 */}
            <TabBar
              unselectedTintColor="#949494"
              tintColor="#33A3F4"
              barTintColor="white"
              hidden={this.state.hidden}
            >
              <TabBar.Item
                title="Life"
                key="Life"
                icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                />
                }
                selected={this.state.selectedTab === 'blueTab'}
                badge={1}
                onPress={this.handlerTabChange.bind(this,'blueTab')}
                data-seed="logId"
              >
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                  />
                }
                title="Koubei"
                key="Koubei"
                badge={'new'}
                selected={this.state.selectedTab === 'redTab'}
                onPress={this.handlerTabChange.bind(this,'redTab')}
                data-seed="logId1"
              >
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                  />
                }
                title="Friend"
                key="Friend"
                dot
                selected={this.state.selectedTab === 'greenTab'}
                onPress={this.handlerTabChange.bind(this,'greenTab')}
              >
              </TabBar.Item>
              <TabBar.Item
                icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                title="My"
                key="my"
                selected={this.state.selectedTab === 'yellowTab'}
                onPress={this.handlerTabChange.bind(this,'yellowTab')}
              >
              </TabBar.Item>
            </TabBar>
        </div>
      </div>
    )
  }
}
export default withRouter(connect()(App));