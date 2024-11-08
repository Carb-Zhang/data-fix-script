import { Document, Model } from 'mongoose';

declare const SearchingTag: Model<SearchingTagSchema>;
export default SearchingTag;

export interface SearchingTagSchema extends Document {
    tagName: string;
    tagType: string;
    createdBy: string;
    createdTime: string;
    modifiedTime: string;
}
