type EventName = "change" | "unset";

interface IBackboneModel {
  get(attribute: string): unknown | undefined;
  set(attribute: string, value: unknown): void;
  has(attribute: string): boolean;
  unset(attribute: string): void;
  on(
    eventName: EventName,
    attribute: string,
    callback: Function,
    context?: any,
  ): void;
  off(event: EventName, attribute: string, callback: Function): void;
}

// You are free to use alternative approaches of
// defining BackboneModel as long as the
// default export can be instantiated.
export default class BackboneModel implements IBackboneModel {
  private model: Record<string, unknown>;
  private eventMap: Map<
    string,
    Map<EventName, Array<{ callback: Function; context?: any }>>
  >;

  constructor(initialValues: Record<string, unknown> = {}) {
    this.model = structuredClone(initialValues ?? {});
    this.eventMap = new Map();
  }

  get(attribute: string): unknown | undefined {
    return this.model[attribute];
  }

  set(attribute: string, newValue: unknown): void {
    const isPresent = this.has(attribute);
    const currentValue = this.get(attribute);
    const isChanged = currentValue !== newValue;
    if (!isChanged) {
      return;
    }
    this.model[attribute] = newValue;
    if (!isPresent) {
      return;
    }
    this.invokeCallbacks("change", attribute, [
      attribute,
      newValue,
      currentValue,
    ]);
  }

  has(attribute: string): boolean {
    return attribute in this.model;
  }

  unset(attribute: string): void {
    if (!this.has(attribute)) {
      return;
    }
    const previousValue = this.model[attribute];
    delete this.model[attribute];
    this.invokeCallbacks("unset", attribute, [attribute]);
    this.eventMap.delete(attribute);
  }

  on(
    eventName: EventName,
    attribute: string,
    callback: Function,
    context?: any,
  ): void {
    if (!this.eventMap.has(attribute)) {
      this.eventMap.set(attribute, new Map());
    }
    const attributeEventMap = this.eventMap.get(attribute)!;
    if (!attributeEventMap.has(eventName)) {
      attributeEventMap.set(eventName, []);
    }
    const callbacks = attributeEventMap.get(eventName)!;
    callbacks.push({
      callback,
      context,
    });
    attributeEventMap.set(eventName, callbacks);
  }

  off(
    eventName: EventName,
    attribute: string,
    callbackToUnsubscribe: Function,
  ): void {
    if (
      !this.eventMap.has(attribute) ||
      !this.eventMap.get(attribute)!.has(eventName)
    ) {
      return;
    }
    let callbacks = this.eventMap.get(attribute)!.get(eventName)!;
    callbacks = callbacks.filter(
      ({ callback }) => callback !== callbackToUnsubscribe,
    );
    this.eventMap.get(attribute)!.set(eventName, callbacks)!;
  }

  private invokeCallbacks(
    eventName: EventName,
    attribute: string,
    args?: any[],
  ) {
    if (
      !this.eventMap.has(attribute) ||
      !this.eventMap.get(attribute)!.has(eventName)
    ) {
      return;
    }
    const callbacks = this.eventMap.get(attribute)!.get(eventName)!;
    for (const { callback, context } of callbacks) {
      callback.apply(context, args);
    }
  }
}
