import { AppInjector } from "../helper/app.injector";
import { LoaderService } from "../services/loader.service";

export class LoaderPage {
    public isLoading!: boolean;
    public loader: LoaderService;
  
    constructor() {
      const injector = AppInjector.getInjector();    
      this.loader = injector.get(LoaderService);
    }
  
    protected loadingStarted(): void {
      this.isLoading = true;
      this.loader.show();
    }
  
    protected loadingFinished(): void {
      this.isLoading = false;
      this.loader.hide();
    }
  }