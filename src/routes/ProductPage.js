import {  ListView,SearchBar,Button } from 'antd-mobile';
import {TabBar,List,NavBar,Icon,Drawer,sidebar} from 'antd-mobile'
import {ReactDOM,mountNode} from 'react'
import React from 'react'
import axios from 'axios'
import {connect} from 'dva'
import {withRouter,routerRedux} from 'dva/router'

import App2 from './App2'

// const data = [
//     {
//       img :"hahahhhhh",
//       title: "lalaaaaaa",
//       des: "kkkkkkk",
//     },
//   ];
    // {
    //   img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    //   title: 'McDonald\'s invites you',
    //   des: '不是所有的兼职汪都需要风吹日晒',
    // },
    // {
    //   img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    //   title: 'Eat the week',
    //   des: '不是所有的兼职汪都需要风吹日晒',
    // },
  
  const NUM_SECTIONS = 5;
  const NUM_ROWS_PER_SECTION = 5;
  let pageIndex = 0;
  
  const dataBlobs = {};
  let sectionIDs = [];
  let rowIDs = [];
  function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
      const ii = (pIndex * NUM_SECTIONS) + i;
      const sectionName = `Section ${ii}`;
      sectionIDs.push(sectionName);
      dataBlobs[sectionName] = sectionName;
      rowIDs[ii] = [];
  
      for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        const rowName = `S${ii}, R${jj}`;
        rowIDs[ii].push(rowName);
        dataBlobs[rowName] = rowName;
      }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
  }
  
  
   
    
class ProductPage extends React.Component {
      constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    
        const dataSource = new ListView.DataSource({
          getRowData,
          getSectionHeaderData: getSectionData,
          rowHasChanged: (row1, row2) => row1 !== row2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
          
        });
    
        this.state = {
          list:[{
            // name:"haha",
            // description :"kakakkaka",
            // price:35
          }],
          docked: false,
          dataSource,
          price:0,
          isLoading: true,
          height: (document.documentElement.clientHeight * 3) / 4,
        };
      }


      onDock = () => {
        this.setState({
          docked: !this.state.docked,
        });
      }
      componentDidMount() {
        //const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        setTimeout(() => {
          genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
            
         //   height: hei,
          });
        }, 600);
        this.reloadData();
      }
    
      reloadData(){
        this.setState({loading:true});
        axios.get("/product/findAll")
        .then((result)=>{
          // 将查询数据更新到state中
         this.setState({list:result.data});
       
        })
        .finally(()=>{
          this.setState({loading:false});
        })
      }

      onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
          genData(++pageIndex);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
            isLoading: false,
          });
        }, 1000);
      }
    

      findbyId(id){
        axios.get("/category/findAllProductWithCategory?id="+id).then((result) => {
          this.setState({list:result.data});
          //console.log(id)
        })
      }


      searchMethod(mess){
        axios.post("/category/query",{name:mess}).then((result)=>{
          this.setState({list:result.data});
          console.log(mess+"mess");
        })
      }

      priceCount(pricee){
this.setState({price:this.price+pricee});
console.log(this.price);
      }

      render() {
        const sidebar = (<List>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i, index) => {
            if (index === 0) {
              return (<List.Item key={index} 
  
                onClick={() => {this.findbyId(1) }}
              >保姆</List.Item>);
            }
            if (index === 1) {
            return (<List.Item key={index}
           
              onClick={() => {this.findbyId(2) }}
            >育婴</List.Item>);
          }
          if (index === 2) {
            return (<List.Item key={index}
              
              onClick={() => {this.findbyId(3) }}
            >保洁</List.Item>);
          }
          if (index === 3) {
            return (<List.Item key={index}
              
              onClick={() => {this.findbyId(4) }}
            >月嫂</List.Item>);
          }
          if (index === 4) {
            return (<List.Item key={index}
              
              onClick={() => {this.findbyId(5) }}
            >搬家</List.Item>);
          }
          if (index ===5) {
            return (<List.Item key={index}
              
              onClick={() => {this.findbyId(6) }}
            >老人护理</List.Item>);
          }
          if (index === 6) {
            return (<List.Item key={index}
              
              onClick={() => {this.findbyId(7) }}
            >高级家具安装</List.Item>);
          }
          if (index === 7) {
            return (<List.Item key={index}
          
              onClick={() => {this.findbyId(8) }}
            >一般家具安装</List.Item>);
          }
          if (index === 8) {
            return (<List.Item key={index}
           
              onClick={() => {this.findbyId(9) }}
            >家庭烹饪</List.Item>);
          }
          if (index === 9) {
            return (<List.Item key={index}
           
              onClick={() => {this.findbyId(10) }}
            >普通区域清洁</List.Item>);
          }
          if (index === 10) {
            return (<List.Item key={index}
           
              onClick={() => {this.findbyId(11) }}
            >重污区域清洁</List.Item>);
          }
          if (index === 11) {
            return (<List.Item key={index}
           
              onClick={() => {this.findbyId(12) }}
            >小时工</List.Item>);
          }
          if (index === 12) {
            return (<List.Item key={index}
             
              onClick={() => {this.findbyId(13) }}
            >护工</List.Item>);
          }
          if (index === 13) {
            return (<List.Item key={index}
             
              onClick={() => {this.findbyId(14) }}
            >涉外家政</List.Item>);
          }

          })}
        </List>);
        const separator = (sectionID, rowID) => (
          <div
            key={`${sectionID}-${rowID}`}
            style={{
              backgroundColor: '#F5F5F9',
              height: 6,
              borderTop: '1px solid #ECECED',
              borderBottom: '1px solid #ECECED',
            }}
          />
        );
        let index = this.state.list.length - 1;
        const row = (rowData, sectionID, rowID) => {
          if (index < 0) {
            index = this.state.list.length - 1;
          }
          const obj = this.state.list[index--];

          
          return (
            <div key={rowID} style={{ padding: '0 15px' }}>
              <div
                style={{
                  lineHeight: '50px',
                  color: '#888',
                  fontSize: 18,
                  borderBottom: '1px solid #F6F6F6',
                }}
              >{obj.name}</div>
              <div style={{ display: 'flex', padding: '15px 0' }}>
                <img style={{ height: '64px', marginRight: '15px' }} src={"http://134.175.154.93:8888/group1/"+obj.photo} alt="" />
                <div style={{ lineHeight: 1 }}>
                  <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.description}</div>
                  <div><span style={{ fontSize: '15px', color: '#FF6E27' }}>价钱</span>¥<span  style={{ fontSize: '30px', color: '#FF6E27' }}> {obj.price}</span>
                  <span><Button type="primary" size="small" >添加</Button></span>
                  {/* onclick={this.priceCount(obj.price)} */}
                  </div>
                </div>
              </div>
            </div>
          );
        };
    
        return (

          <div>
       
      
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
        sidebarStyle={{ border: '1px solid #ddd' }}
        sidebar={sidebar}
        docked={this.state.docked}
        onOpenChange={this.onDock}
      >
       
       <NavBar icon={<Icon type="ellipsis" />}  onLeftClick={ this.onDock}>
        家政种类选择
      </NavBar>
        
         
            <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              // renderHeader={() => <span>header</span>}
              // renderHeader={()=>(<div style={{ padding: 30, textAlign: 'center'}}></div>)}
              // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center'}}>
              //   {this.state.isLoading ? 'Loading...' : 'Loaded'}
              // </div>)}
              // renderSectionHeader={sectionData => (
              //   <div>{`Task ${sectionData.split(' ')[1]}`}</div>
              // )}
              renderRow={row}
              renderSeparator={separator}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              pageSize={4}
              onScroll={() => { console.log('scroll'); }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
           
           </Drawer>
           
      
      
         
         </div>
        );
        ReactDOM.render(<ProductPage />, mountNode);
      }

     
}
export default withRouter(connect()(ProductPage));
