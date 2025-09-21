import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { CreateEditionUseCase } from './create-edition.use-case'
import { ListEditionsUseCase } from './list-editions.use-case'

@Module({
  imports: [DatabaseModule],
  providers: [CreateEditionUseCase, ListEditionsUseCase],
  exports: [CreateEditionUseCase, ListEditionsUseCase],
})
export class EditionUseCasesModule {}
