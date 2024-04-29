const testcase1 = () => {
    var items = [
        { name: 'car', colour: 'red', brand: 'tata', cost: 'medium' },
        { name: 'bike', colour: 'blue', brand: 'mahin', cost: 'medium' },
        { name: 'truck', colour: 'red', brand: 'mahin', cost: 'medium' },
        { name: 'car', colour: 'purple', brand: 'tata', cost: 'high' },
    ];
    
    var excludes = [
        { key: 'name', val: 'bike' },
        { key: 'colour', val: 'red' }
    ]
    const filteredItems = myFilter(items, excludes);

    console.table(filteredItems);
};

const testcase2 = () => {
    var items = [
        {name:'car', colour:'red', brand:'tata', cost:'medium'}, //
        {name:'bike', colour:'blue', brand:'mahin', cost:'medium'}, //
        {name:'truck', colour:'black', brand:'mahin', cost:'high'},
        {name:'truck', colour:'grey', brand:'ashok leyland', cost:'low'}, //
        {name:'truck', colour:'grey', brand:'benz', cost:'low-medium'}, //
        {name:'car', colour:'purple', brand:'tata', cost:'high'},
        {name:'cycle', colour:'pink', brand:'tata', cost:'low'}, //
        {name:'cycle', colour:'green', brand:'tata', cost:'medium'}, //
        {name:'cycle', colour:'white', brand:'maruti', cost:'medium'}, //
    ];
    
    var excludes = [
        {key:'name',val:'bike'},
        {key:'name',val:'cycle'},
        {key:'colour', val:'red'},
        {key:'brand',val:'maruti'},
        {key:'brand',val:'maruti'},
        {key:'cost',val:'low'},
        {key:'cost',val:'low-medium'}
    ];

    const filteredItems = myFilter(items, excludes);

    console.table(filteredItems);
};


const myFilter = (items, excludes) => {
    const excludedKeys = Array.from(new Set(excludes.map(ex => ex.key))); // O(N)

    // Reducing excludes obj to key-value format for O(1) lookup
    const excludedObj = excludes.reduce((obj, curr) => { // O(N)
        if(!obj[curr.key]){
            const set = new Set();
            set.add(curr.val);
            obj[curr.key] = set;
        }
        else obj[curr.key] = obj[curr.key].add(curr.val)
        return obj;
    }, {});

    return items.filter(item => {      // (O(N))      
        for (const key of excludedKeys) {   // O(M)
            if (excludedObj[key].has(item[key])) return false; // O(1)
        }
        return true;
    });

    // O(n) + O(m) + O(n) * O(m) === O(n * m) where n is items array length and m is no. of exluded keys
}

testcase1();

testcase2();