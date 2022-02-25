var node_list = {}
var children_list =[]; 
var content_list ={};
function buildnode(id,type,cid,children,posx,posy,title){
                   var node =  {
                          id: id,
                          contentId: cid,
                          childNodes: children,
                          type: type,
                          position: { x: posx, y: posy }
                      };
                    if (title !== undefined){
                      node["title"] = title;

                     }
                    return node;
}
function flattenchildren(children,list) {
                while (children.length > 0){
                  var c = children.pop();
                  if (c["string"] !== undefined){
                    list.push(c["string"]);
                  }
                  if (c["children"] !== undefined){
                    children.concat(c["children"]);
                  }
                }
                  return list;
}

function parseContent(oid,id,data,posx,posy,title){
                var re = /\#\w+\-?\w+\-?\w+\-?\w+\-?\w+\-?\w+/g;
                var use = false;
                try {
                  var ox = posx
                  var oy = posy
                  var nodes =[]
                  var content = "";
                  var morecontent = "";
                  if (data["string"] !== undefined){
                    content = data["string"];
                  }

                  if (data["children"] !== undefined){
                    morecontent = flattenchildren(data["children"],[])
                    morecontent = morecontent.join(" ")
                  }
                  content  = content +  " " +morecontent
                  var newnodes = content.match(re);

                  for (var i =0; i < newnodes.length; i++) {
                          var n = newnodes[i].replace("#","");
                    if (children_list.indexOf(n) < 0) {
                        children_list.push(n)
                    }
                          if (node_list[n] == undefined){
                            node_list[n] = {"pid":[oid],"id":id,"posx":posx,"posy":posy};
                            var tmpid = id
                            posx += 10;
                            id += 1;
                          }else {
                             var h = node_list[n];
                             tmpid = h["id"]
                             if (h["pid"].indexOf(oid) > -1){
                               h["pid"].push(oid)
                               h["posx"] = (h["posx"]+posx)/2
                               h["posy"] = (h["posy"]+posy)/2
                               posx += 10;
                               node_list[n]= h
                             }
                          }
                          nodes.push(tmpid);
                        }
                  }catch(e){

                  }
                /*if (nodes.length == 0){ 
                  console.log(title);
                }else{
                console.log(nodes);;

                }*/
                var newid = oid;
                if (node_list[title] !== undefined){
                  newid  = node_list[title]["id"]
                }
                  content_list[title] ={"id":newid,"nodes":nodes,"content":content,"x":ox,"y":oy}
                  return id;
}

function storeinipfs(data){
                return "CID... "+ data;
}


function convert(roamgraph){
    console.log(roamgraph);
    var mapsgraph = []
    var id = 0;
    var posx = 10;
    var posy = 10;
    var type = "rootNode";
    for (var i =0; i < roamgraph.length; i++) { 
      var oid = id
      var title = roamgraph[i]["title"];
      id =  parseContent(id,id+1,roamgraph[i],posx,posy,title);
      var content = storeinipfs(content);
      posy += 10; 
    }
    for (var i =0; i < roamgraph.length; i++) { 
      title = roamgraph[i]["title"];
      type = "rootNode"
      if (children_list.indexOf(title) > -1){
        type = "node";
     }
     var hh = content_list[title]
     var x = hh["x"]
     var y = hh["y"]
      var nodes = hh["nodes"]
      var h = node_list[title]
      if (h !== undefined){
        x = h["posx"];
        y = h["posy"];
      }

     mapsgraph.push(buildnode(hh["id"],type,hh["content"],nodes,x,y,title))
  }

  return mapsgraph;
}
  
  
  
export const getTreeIds = () => {
    // TODO
    return [];
}
export const getTree = (treeId) => {
    // TODO
    return [];
}

export const getContent = (contentId) => {
    // TODO
    return {};
}

export const save = (treeId, nodes, content) => {
    // TODO
    console.log(treeId);
    console.log(nodes);
    console.log(content);
}

export const roamimport = (url) => {
    console.log(url)
    fetch(url)
    .then(response =>  response.json()     
            

    ) // <=== Parses the JSON
    .then(responseJson => {
        
       var map = convert(responseJson);
            console.log(map);
    })
    .catch(error => {
      console.error(error);
    });
    
    
}