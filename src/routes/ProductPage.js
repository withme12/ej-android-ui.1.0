import {  ListView } from 'antd-mobile';
import React from 'react'
import axios from 'axios'


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
          dataSource,
          isLoading: true,
          height: (document.documentElement.clientHeight * 3) / 4,
        };
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
         console.log("hahahhhhaaaahhhhaaa");
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
    
      render() {
        const separator = (sectionID, rowID) => (
          <div
            key={`${sectionID}-${rowID}`}
            style={{
              backgroundColor: '#F5F5F9',
              height: 8,
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
                <img style={{ height: '64px', marginRight: '15px' }} src={obj.photo} alt="" />
                <div style={{ lineHeight: 1 }}>
                  <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.description}</div>
                  <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>价钱</span>¥ {obj.price}</div>
                </div>
              </div>
            </div>
          );
        };
    
        return (
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
        );
      }
}
export default ProductPage;