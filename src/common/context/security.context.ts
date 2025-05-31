import { Injectable } from "@nestjs/common";

@Injectable()
export class SecurityContextHolder {

    private readonly context: Map<string, any> = new Map<string, any>();


    public setContext<T>(key: string, value: T): void{
        this.context.set(key, value);
    }

    public getContext<T>(key: string): T | null {
        return this.context.get(key)
    }
}