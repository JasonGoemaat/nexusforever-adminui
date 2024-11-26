const registry: any = {
}

const add = (k1: any, k2: any, v: any) => {
    if (v) {
        registry[k1] = registry[k1] || {}
        registry[k1][k2] = v
    } else {
        registry[k1] = k2
    }
}

registry.add = add

if (typeof(window) === 'object') {
    (window as any).r = registry
}

export default registry