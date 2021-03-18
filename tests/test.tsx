import {Stayt} from 'stayt'
import {useStayt, useOptionStayt, useDiscStayt, useArrStayt} from '../src/index'
import renderer from 'react-test-renderer';
import React from 'react'
const {useState} = React
const {act} = renderer

{
    type T = {kind: "string", value: string} | {kind: "number", value: number}
    let i = 0;
    let j = 0;
    let k = 0;
    const Num = ({v}: {v: Stayt<number>}) => {
        i++
        const n = useStayt(v)
        return <p>{i} {n + n}</p>
    }
    const Str = ({v}: {v: Stayt<string>}) => {
        const s = useStayt(v)
        j++
        return <p>{j} {s}</p>
    }
    const Test = ({v}: {v: Stayt<T>}) => {
        k++
        const val = useDiscStayt(v)
        return <>
            <p>{k}</p>
            {val.kind === "number" ?
                <Num v={val.state.prop("value")}/>
            :
                <Str v={val.state.prop("value")}/>
            }
        </>
    }
    const state: Stayt<T> = new Stayt({kind: "string", value: "Hello World"})
    test('Test', async () => {
        const component = renderer.create(
            <Test v={state}/>,
        );

        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()

        act(() => state.disc("string").prop("value").modify(s => s + "!"))
        tree = component.toJSON()

        expect(tree).toMatchSnapshot()
        act(() => state.modify(_ => ({kind: "number", value: 3})))

        tree = component.toJSON()
        expect(tree).toMatchSnapshot()

        act(() => state.disc("number").prop("value").modify(n => n + 1))
        tree = component.toJSON()

        expect(tree).toMatchSnapshot()
    })
}
{
    const Num = ({v}: {v: Stayt<number>}) => {
        const n = useStayt(v)
        return <p>{n + n}</p>
    }
    const Test = ({v}: {v: Stayt<number[]>}) => {
        const val = useArrStayt(v)
        return <>
            {val.map((n, i) => <Num key={i} v={n}/>)}
        </>
    }
    const state = new Stayt([1, 2, 3, 4])
    test('ArrTest', async () => {
        const component = renderer.create(
            <Test v={state}/>,
        );
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
        act(() => state.index(2).modify(n => n + 1))
        tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

}