const createHOC = (component,options = {})=>{
    const hoc = {
        //props属性复制
        props:typeof component === "function"
            ?component.options.props
            :component.options,
        created(){
            // 当前创建虚拟节点的钩子需要为父节点的，才能正确识别插槽
            this.$createElement = this.$parent.$createElement;
        },
        render(h){
            const slots = Object.keys(this.$slots).reduce((arr,key)=>{
                return arr.concat(this.$slots[key])
            },[])

            return h(component,{
                props:this.$props,
                on:this.$listeners,
                attrs:this.$attrs,
                scopedSlots: this.$scopedSlots
            },slots)              
        }
    }

    if(!options.mixin) options.mixin =[];
    options.mixin.push(hoc);

    options.name = component.name ?  `${component.name}Hoc`:"SomeHOC"

    return options;
}

export default createHOC;
