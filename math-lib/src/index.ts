import { add, and, divide, equals, gte, lt, lte, modulo, multiply, or, subtract } from 'ramda';
import { v1, v4, v6, v7, version as uuidVersion,  validate as uuidValidate } from 'uuid';
import {
    CreateMLCEngine,
    MLCEngine,
    type ChatCompletion,
    type ChatCompletionMessageParam,
    type ChatCompletionRequestNonStreaming,
    type InitProgressReport,
    type ChatCompletionSystemMessageParam,
    type ChatCompletionUserMessageParam
} from '@mlc-ai/web-llm';

// type ChatCompletionMessageParam =
//     | { role: "system"; content: string }
//     | { role: "user"; content: string | ChatCompletionContentPart[]; name?: string }
//     | { role: "assistant"; content?: string | null; name?: string; tool_calls?: ChatCompletionMessageToolCall[] }
//     | { role: "tool"; content: string; tool_call_id: string };

const defaultModel: string = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';

export function average(...args: Array<number>): number {
    const { length: argsLength }: Record<'length', number> = args;

    if (equals<number>(argsLength, 0)) {
        return 0;
    }
    const sum: number = args.reduce((acc: number, val: number): number => add(acc, val), 0);

    return divide(sum, argsLength);
}

export function sum(...args: Array<number>): number {
    return args.reduce((acc: number, val: number): number => add(acc, val), 0);
}

export function median(...args: Array<number>): number {
    const { length: argsLength }: Record<'length', number> = args;

    if (equals<number>(argsLength, 0)) {
        return 0;
    }

    const sorted: Array<number> = [...args].sort((a: number, b: number): number => subtract(a, b));
    const { length: sortedLength }: Record<'length', number> = sorted;
    const mid: number = Math.floor(divide(sortedLength, 2));

    if (equals<number>(modulo(sortedLength, 2), 0)) {
        return divide(add(sorted[subtract(mid, 1)], sorted[mid]), 2);
    } else {
        return sorted[mid];
    }
}

export function factorial(n: number): number {
    let result: number = 1;

    if (lt<number>(n, 0)) {
        throw new Error('Factorial is not defined for negative numbers');
    }

    if (or<true, boolean>(equals<number>(n, 0), equals<number>(n, 1))) {
        return 1;
    }

    for (let i: number = 2; lte<number>(i, n); i++) {
        result *= i;
    }

    return result;
}

export function getRandomInt(min: number, max:number): number {
    const random: number = Math.random();

    if (gte<number>(min, max)) {
        throw new Error('Min must be less than Max');
    }

    return add(Math.floor(multiply(random, (add(subtract(max, min), 1)))), min);
}

export function randomUUID(type: string = ''): string {
    let uuid: string;

    switch ( type ) {
        case 'v1':
            uuid = v1();
            break;
        case 'v4':
            uuid = v4();
            break;
        case 'v6':
            uuid = v6();
            break;
        default:
            uuid = v7();
    }

    return uuid;
}

export function validateUuid(uuid: string, version: number): boolean {
    return and<boolean, boolean>(uuidValidate(uuid), equals<number>(uuidVersion(uuid), version));
}

export async function webLlm(text: string, selectedModel: string = defaultModel): Promise<ChatCompletion> {
    const engine: MLCEngine = await CreateMLCEngine(selectedModel, {
        initProgressCallback: (progress:  InitProgressReport): void => {
            console.log('Model loading progress:', progress);
        }
    });

    const system: ChatCompletionSystemMessageParam = {
        role: 'system',
        content: 'You are a helpful AI assistant.'
    };

    const user: ChatCompletionUserMessageParam = {
        role: 'user',
        content: String(text ?? "")
    };

    const messages: Array<ChatCompletionMessageParam> = [
        {...system},
        {...user},
    ];

    const request: ChatCompletionRequestNonStreaming = {
        messages,
        tools: undefined,
        tool_choice: undefined
    };

    return engine.chat.completions.create(request);
}
