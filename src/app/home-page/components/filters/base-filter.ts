import { FilterService } from '../../services/filter.service';

export class BaseFilter {
    clear() { }

    constructor(filterService: FilterService) {
        filterService.subscribeClearAction().subscribe(x => this.clear());
    }
}
