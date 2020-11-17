export declare const defaultValue = "!master,!main,*";
/**
 * Whether a branch should be deleted
 * @param branch - Name of branch
 * @param rules - List of glob rules
 */
export declare const shouldMerge: (branch: string, rules?: string | undefined) => boolean;
