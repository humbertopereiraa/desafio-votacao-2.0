import { NgModule } from '@angular/core'
import { FiltarPautasPipe } from 'src/app/core/pipes/filtarPautas.pipe'

@NgModule({
  declarations: [FiltarPautasPipe],
  exports: [FiltarPautasPipe]
})
export class PipePautaSharedModule { }
